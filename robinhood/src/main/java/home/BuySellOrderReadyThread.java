package home;

import home.model.BuySellOrder;
import home.model.DB;
import home.model.RobinhoodOrderResult;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BuySellOrderReadyThread extends Thread {
    private final Logger logger = LoggerFactory.getLogger(BuySellOrderReadyThread.class);
    private final DB db;
    private final OrderService orderService;
    private final WebSocketHandler wsh;

    public BuySellOrderReadyThread(DB db, OrderService orderService, WebSocketHandler wsh) {
        this.db = db;
        this.orderService = orderService;
        this.wsh = wsh;
    }

    @Override public void run() {
        while (true) {
            try {
                BuySellOrder bso = db.waitForBuySellOrder();
                RobinhoodOrderResult ror = orderService.buySell(bso);
                if (ror == null) {
                    // for some reason, Robinhood didn't accept our request, then we retry it later.
                    // db.addBuySellOrder(buySellOrder);
                    wsh.send("ERROR: Robinhood DIDN'T ACCEPT YOUR ORDER|" + bso.humanBeingString());
                } else if (bso.isResell()) {
                    db.addBuySellOrderNeedsFlipped(bso.setId(ror.getId()));
                }
            }
            catch (Exception ex) {
                logger.error("Fix me because this kind of exception can stop the BuySellOrderReadyThread.", ex);
            }
        }
    }
}
