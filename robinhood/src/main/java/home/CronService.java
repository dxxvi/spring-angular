package home;

import home.model.DB;
import home.model.Order;
import home.model.RobinhoodOrdersResult;
import home.model.Stock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
                orders.stream().filter(o -> o.getId().equals(lastOrder.getId())).findAny()
                        .ifPresent(o -> {
                            lastOrder.setState(o.getState());
                            stock.getLatestQuote().getPrice();
                        });
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
}
