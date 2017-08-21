package home;

import org.springframework.scheduling.annotation.Scheduled;

public class CronService {
    private final QuoteService quoteService;
    private final OrderService orderService;

    public CronService(QuoteService quoteService, OrderService orderService) {
        this.quoteService = quoteService;
        this.orderService = orderService;
    }

    @Scheduled(cron = "0/5 0/1 * * * *")
    public void cron() {
        quoteService.quotes();
        orderService.orders();
    }
}
