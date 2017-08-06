package home;

import home.model.DB;
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
            String orderId = db.waitForCancelledOrder();
            String loginToken = httpService.login(username, password);
            httpService.cancelOrder(orderId, loginToken);
            wsh.send("CANCELLED ORDER: " + orderId);
        }
    }
}
