package home;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;

public class CronService {
    private final Logger logger = LoggerFactory.getLogger(CronService.class);

    private final QuoteService quoteService;
    private final OrderService orderService;

    public CronService(QuoteService quoteService, OrderService orderService) {
        this.quoteService = quoteService;
        this.orderService = orderService;
    }

    @Scheduled(cron = "0/5 0/1 * * * *")
    public void cron() {
        try {
            quoteService.quotes();
            orderService.orders();
        }
        catch (Exception ex) {
            logger.error("Fix me", ex);
        }
    }
}
