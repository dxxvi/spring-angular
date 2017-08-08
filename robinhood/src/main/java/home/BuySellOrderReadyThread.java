package home;

import home.model.BuySellOrder;
import home.model.DB;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BuySellOrderReadyThread extends Thread {
    private final Logger logger = LoggerFactory.getLogger(BuySellOrderReadyThread.class);
    private final DB db;
    private final OrderService orderService;

    public BuySellOrderReadyThread(DB db, OrderService orderService) {
        this.db = db;
        this.orderService = orderService;
    }

    @Override public void run() {
        while (true) {
            BuySellOrder buySellOrder = db.waitForBuySellOrder();
            orderService.buySell(buySellOrder);
        }
    }
}
