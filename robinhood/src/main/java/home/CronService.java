package home;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ForkJoinPool;

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
        Runnable orderTask = () -> {
            try {
                orderService.orders();
            }
            catch (Exception ex) {
                logger.error("Fix me", ex);
            }
            latch.countDown();
        };
        ForkJoinPool.commonPool().submit(quoteTask);
        ForkJoinPool.commonPool().submit(orderTask);

        try {
            latch.await();
        }
        catch (InterruptedException iex) { /* who cares */ }

        Runnable positionTask  = positionService::positions;
        Runnable portfolioTask = portfolioService::portfolio;
        ForkJoinPool.commonPool().submit(positionTask);
        ForkJoinPool.commonPool().submit(portfolioTask);
    }
}
