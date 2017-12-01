package home;

import home.model.BuySellOrder;
import home.model.DB;
import home.model.RobinhoodOrderResult;
import home.model.Stock;
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
        boolean needToSleep = false;
        int gudqi = -2;
        while (true) {
            try {
                BuySellOrder bso = db.waitForBuySellOrder();
                String symbol = bso.getSymbol();
                Stock stock = db.getStock(symbol);
                if (stock == null) {
                    throw new RuntimeException("Why no stock " + symbol + " in db?");
                }
                if (stock.getAutoRun() != 0) {
                    wsh.send("ERROR: " + symbol + " is currently in AUTO RUN mode|So no manual BUY nor SELL.");
                    continue;
                }

                if (bso.getSide().equals("buy") && stock.isGoingDown()) {
                    if (gudqi != stock.getGoingUpDownQuotesIndex()) {
                        gudqi = stock.getGoingUpDownQuotesIndex();
                        wsh.send("INFO: YOU ASK TO BUY|... but the price is going down, so wait a bit.");
                        needToSleep = true;
                    }
                    else if (needToSleep) {
                        sleep();
                    }
                    db.addBuySellOrder(bso);
                    continue;
                }

                if (bso.getSide().equals("sell") && stock.isGoingUp()) {
                    if (gudqi != stock.getGoingUpDownQuotesIndex()) {
                        gudqi = stock.getGoingUpDownQuotesIndex();
                        wsh.send("INFO: YOU ASK TO SELL|... but the price is going up, so wait a bit.");
                        needToSleep = true;
                    }
                    else if (needToSleep) {
                        sleep();
                    }
                    db.addBuySellOrder(bso);
                    continue;
                }

                needToSleep = false;

                RobinhoodOrderResult ror = orderService.buySell(bso);
                if (ror == null) {
                    wsh.send("ERROR: Robinhood DIDN'T ACCEPT YOUR ORDER|" + bso.humanBeingString());
                }
                else if (bso.isResell()) {
                    if (bso.getStartAutoRun() == 0) {
                        db.addBuySellOrderNeedsFlipped(bso.setId(ror.getId()));
                    }
                    else {
                        wsh.send("WARNING: THIS ORDER IGNORED|Because AUTO RUN is set.");
                    }
                }
                else if (bso.getStartAutoRun() == -1) {
                    stock.startAutorun(ror.toOrder());
                }
                else if (bso.getStartAutoRun() == 1) {
                    stock.startAutorunSell(ror.toOrder());
                }
            }
            catch (Exception ex) {
                logger.error("Fix me because this kind of exception can stop the BuySellOrderReadyThread.", ex);
            }
        }
    }

    private void sleep() {
        try {
            Thread.sleep(419);
        }
        catch (InterruptedException iex) { /* who cares */ }
    }
}
