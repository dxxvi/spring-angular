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

import java.util.Map;
import java.util.Optional;
import java.util.SortedSet;
import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ForkJoinTask;

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
        CountDownLatch latch = new CountDownLatch(2);
        Runnable quoteTask = () -> {
            try {
                quoteService.quotes();
            }
            catch (Exception ex) {
                logger.error("Fix me", ex);
            }
            latch.countDown();
        };
        Callable<RobinhoodOrdersResult> orderTask = () -> {
            RobinhoodOrdersResult result = null;
            try {
                result = orderService.orders();
            }
            catch (Exception ex) {
                logger.error("Fix me", ex);
            }
            latch.countDown();
            return result;
        };
        ForkJoinPool.commonPool().submit(quoteTask);
        ForkJoinTask<RobinhoodOrdersResult> fjt = ForkJoinPool.commonPool().submit(orderTask);

        try {
            latch.await();

            // TODO do the auto run here
            Map<String, SortedSet<Order>> symbolOrdersMap = Utils.buildSymbolOrdersMap(fjt.get(), db, httpService);
            symbolOrdersMap.forEach((symbol, orders) -> {
                Stock stock = db.getStock(symbol);
                if (stock == null || !stock.isAutoRun()) {
                    return;
                }
                Order lastOrder = stock.getLastAutoRunOrder();
                Order autoRunSellOrder = stock.getAutoRunSellOrder();
                orders.forEach(o -> {
                    Order order = null;
                    if (o.getId().equals(lastOrder.getId())) {
                        order = lastOrder;
                    }
                    if (autoRunSellOrder != null && o.getId().equals(autoRunSellOrder.getId())) {
                        order = autoRunSellOrder;
                    }
                    if (order != null) {
                        order.setState(o.getState());
                    }
                });
                doAutoRun(stock);
            });

            orderService.sendOrdersToBrowser(fjt.get());
        }
        catch (InterruptedException iex) { /* who cares */ }
        catch (ExecutionException eex) {
            logger.error("Got exception from fjt.get: {}: {}", eex.getClass().getName(), eex.getMessage());
        }

        Runnable positionTask  = positionService::positions;
        Runnable portfolioTask = portfolioService::portfolio;
        ForkJoinPool.commonPool().submit(positionTask);
        ForkJoinPool.commonPool().submit(portfolioTask);
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
                logger.debug("We haven't bought any share of yet. So do nothing and wait for the next quote.");
                return;
            }
            RobinhoodOrderResult ror = httpService.buySell(stock.createAutoRunSellOrder(t._1()), loginToken);
            stock.setAutoRunSellOrder(ror.toOrder());
            logger.debug("Just created an auto run sell order {}@${}.", ror.getQuantity(), ror.getPrice());
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
                logger.debug("The auto run sell order is obsolete because its quantity is only {}. So cancel it.",
                        autoRunSellOrder.getQuantity());
                RobinhoodOrderResult ror = httpService.buySell(stock.createAutoRunSellOrder(quantity), loginToken);
                stock.setAutoRunSellOrder(ror.toOrder());
                logger.debug("Create a new auto run sell order {} @ ${}.", ror.getQuantity(), ror.getPrice());
            }
            Quote latestQuote = stock.getLatestQuote();
            if (latestQuote.getPrice().doubleValue() < stock.calculatePriceForNextAutoRunBuyOrder()) {
                logger.debug("Stock price keeps going down. Last buy {} now {}.",
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
