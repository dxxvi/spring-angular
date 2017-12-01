package home;

import home.model.DB;
import home.model.Order;
import home.model.Quote;
import home.model.RobinhoodOrderResult;
import home.model.RobinhoodOrdersResult;
import home.model.Stock;
import home.model.Tuple2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Collections;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.SortedSet;
import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ForkJoinTask;
import java.util.stream.Stream;

public class CronService {
    private final Logger logger = LoggerFactory.getLogger(CronService.class);

    private final QuoteService quoteService;
    private final OrderService orderService;
    private final PositionService positionService;
    private final PortfolioService portfolioService;
    private final DB db;
    private final HttpService httpService;

    @Value("${username}") private String username;
    @Value("${password}") private String password;

    public CronService(QuoteService quoteService, OrderService orderService, PositionService positionService,
                       PortfolioService portfolioService, DB db, HttpService httpService) {
        this.quoteService = quoteService;
        this.orderService = orderService;
        this.positionService = positionService;
        this.portfolioService = portfolioService;
        this.db = db;
        this.httpService = httpService;
    }

    @Scheduled(cron = "0/5 0/1 * * * *")
    public void cron() {
        CountDownLatch latch = new CountDownLatch(1);
        Runnable quoteTask = () -> {
            try {
                quoteService.quotes();
            }
            catch (Exception ex) {
                logger.error("Fix me", ex);
            }
            latch.countDown();
        };
        ForkJoinPool.commonPool().execute(quoteTask);

        try {
            RobinhoodOrdersResult result = new RobinhoodOrdersResult();
            result.setResults(Collections.emptyList());
            try {
                result = orderService.orders();
            }
            catch (Exception ex) {
                logger.error("Fix me", ex);
            }
            latch.await();

            ForkJoinPool.commonPool().execute(positionService::positions);
            ForkJoinPool.commonPool().execute(portfolioService::portfolio);

            // do the auto run here
            long t1 = System.currentTimeMillis();
            Map<String, SortedSet<Order>> symbolOrdersMap = Utils.buildSymbolOrdersMap(result, db, httpService);
            symbolOrdersMap.forEach((symbol, orders) -> {
                Stock stock = db.getStock(symbol);
                if (stock == null) {
                    return;
                }

                // TODO check if we should buy when it just goes up after going down
                boolean justGoUp = stock.justGoUp();
                boolean justGoDown = stock.justGoDown();

                if (stock.getAutoRun() == 0) {
                    return;
                }

                orders.forEach(o1 -> {
                    Stream.of(
                            stock.getLastAutoRunOrder(),
                            stock.getAutoRunSellOrder(),
                            stock.getLastAutoRunSellOrder(),
                            stock.getAutoRunBuyOrder()
                    )
                            .filter(Objects::nonNull)
                            .filter(o2 -> o1.getId().equals(o2.getId()))
                            .forEach(o2 -> o2.setState(o1.getState()));
                });
                doAutoRun(stock);
            });
            long t2 = System.currentTimeMillis();
            logger.debug("Do the autorun takes {}, check the thread name.", (t2-t1) / 1000);

            orderService.sendOrdersToBrowser(result);
            t1 = System.currentTimeMillis();
            logger.debug("Sending orders to browsers takes {}, check the thread name.", (t1-t2) / 1000);
        }
        catch (InterruptedException iex) { /* who cares */ }
    }

    /*
     * If no autoRunSell and we already bought some shares, create one.
     * If lastOrder or autoRunSell canceled, cancel the other and close the autoRun cycle.
     * If autoRunSell filled, cancel lastOrder (if it's confirmed) and close the autoRun cycle.
     * If lastOrder filled:
     *     If autoRunSell's quantity incorrect: cancel this autoRunSell, create a new one with correct quantity
     *     If quote << lastOrder's price, create a new order
     */
    private void doAutoRun(Stock stock) {
        logger.debug("Doing auto run for {}.", stock.getSymbol());
        String loginToken = httpService.login(username, password);
        Order autoRunSellOrder = stock.getAutoRunSellOrder();
        if (autoRunSellOrder == null) {
            logger.debug("No auto run sell order yet.");
            Tuple2<Integer, Double> t = stock.calculateQuantityAndPrice();
            if (t._1() == 0) {
                logger.debug("We haven't bought any {} share yet. So do nothing and wait for the next quote.",
                        stock.getSymbol());
                return;
            }
            RobinhoodOrderResult ror = httpService.buySell(stock.createAutoRunSellOrder(t._1()), loginToken);
            stock.setAutoRunSellOrder(ror.toOrder());
            logger.debug("Already bought {} shares, now creat an auto run sell order {}@${}.",
                    t._1(), ror.getQuantity(), ror.getPrice());
        }

        autoRunSellOrder = stock.getAutoRunSellOrder();
        Order lastAutoRunOrder = stock.getLastAutoRunOrder();
        if (isCanceled(autoRunSellOrder)) {
            logger.debug("The auto run sell order was canceled.");
            if ("confirmed".equals(lastAutoRunOrder.getState())) {
                httpService.cancelOrder(lastAutoRunOrder.getId(), loginToken);
                logger.debug("The last auto run buy order's state is confirmed. So cancel it.");
            }
            stock.cancelAutoRun();
            logger.debug("Close this auto run cycle.");
        }
        else if (isCanceled(lastAutoRunOrder)) {
            logger.debug("The last auto run buy order was canceled.");
            if ("confirmed".equals(autoRunSellOrder.getState())) {
                httpService.cancelOrder(autoRunSellOrder.getId(), loginToken);
                logger.debug("The auto run sell order's status is confirmed. So cancel it.");
            }
            stock.cancelAutoRun();
            logger.debug("Close this auto run cycle.");
        }
        else if ("filled".equals(autoRunSellOrder.getState())) {
            logger.debug("The auto run sell order was filled.");
            if ("confirmed".equals(lastAutoRunOrder.getState())) {
                httpService.cancelOrder(lastAutoRunOrder.getId(), loginToken);
                logger.debug("The last auto run buy order's state is confirmed. So cancel it.");
            }
            stock.cancelAutoRun();
            logger.debug("Close this auto run cycle.");
        }
        else if ("filled".equals(lastAutoRunOrder.getState())) {
            logger.debug("Last auto run buy order was filled.");
            Tuple2<Integer, Double> t = stock.calculateQuantityAndPrice();
            int quantity = t._1();
            if (autoRunSellOrder.getQuantity() != quantity) {
                httpService.cancelOrder(autoRunSellOrder.getId(), loginToken);
                logger.debug("The auto run sell order is obsolete (its quantity {} != {}). So cancel it.",
                        autoRunSellOrder.getQuantity(), quantity);
                RobinhoodOrderResult ror = httpService.buySell(stock.createAutoRunSellOrder(quantity), loginToken);
                stock.setAutoRunSellOrder(ror.toOrder());
                logger.debug("Create a new auto run sell order {} @ ${}.", ror.getQuantity(), ror.getPrice());
            }
            Quote latestQuote = stock.getLatestQuote();
            if (latestQuote.getPrice().doubleValue() < stock.calculatePriceForNextAutoRunBuyOrder()) {
                logger.debug("{} price keeps going down. Last buy {} now {}.", stock.getSymbol(),
                        lastAutoRunOrder.getPrice(), latestQuote.getPrice());
                double price = Utils.roundUp2(latestQuote.getPrice().doubleValue());
                int q = (int)((t._2() - quantity*price + calculateProfit()) * 100 - quantity + 1);
                RobinhoodOrderResult ror = httpService.buySell(stock.createAutoRunBuyOrder(q, price), loginToken);
                stock.addAutoRunBuyOrder(ror.toOrder());
                logger.debug("decide to buy {} @ ${}.", q, price);
            }
        }
        logger.debug("End of doing auto run for {}.", stock.getSymbol());
    }

    private double calculateProfit() {
        return 0.01;
    }

    private boolean isCanceled(Order order) {
        return "cancelled".equals(order.getState()) || "canceled".equals(order.getState());
    }
}
