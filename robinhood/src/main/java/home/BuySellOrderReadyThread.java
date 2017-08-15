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
            try {
                BuySellOrder buySellOrder = db.waitForBuySellOrder();
                String id = orderService.buySell(buySellOrder);
                if (id == null) {
                    // for some reason, Robinhood didn't accept our request, then we retry it later.
                    db.addBuySellOrder(buySellOrder);
                } else if (buySellOrder.isResell()) {
                    db.addBuyOrderNeedResold(buySellOrder.setId(id));
                }
            }
            catch (Exception ex) {
                logger.error("Fix me because this kind of exception can stop the BuySellOrderReadyThread.", ex);
            }
        }
    }
}
