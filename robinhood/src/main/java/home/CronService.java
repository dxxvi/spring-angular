package home;

import home.model.RobinhoodOrdersResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;

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

    public CronService(QuoteService quoteService, OrderService orderService, PositionService positionService,
                       PortfolioService portfolioService) {
        this.quoteService = quoteService;
        this.orderService = orderService;
        this.positionService = positionService;
        this.portfolioService = portfolioService;
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
