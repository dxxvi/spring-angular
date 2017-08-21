package home;

import home.model.DB;
import home.model.Order;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OrderCancellingThread extends Thread {
    private final Logger logger = LoggerFactory.getLogger(OrderCancellingThread.class);

    private final DB db;
    private final HttpService httpService;
    private final String username;
    private final String password;
    private final WebSocketHandler wsh;

    public OrderCancellingThread(DB db, HttpService httpService, String username, String password,
                                 WebSocketHandler wsh) {
        this.db = db;
        this.httpService = httpService;
        this.username = username;
        this.password = password;
        this.wsh = wsh;
    }

    @Override public void run() {
        while (true) {
            Order co = db.waitForCancelledOrder();
            String loginToken = httpService.login(username, password);
            httpService.cancelOrder(co.getId(), loginToken);
            wsh.send("CANCELLED ORDER: " + String.format("%s %d %s @ %s",
                    co.getSide(), co.getQuantity(), co.getSymbol(), co.getPrice()));
        }
    }
}
