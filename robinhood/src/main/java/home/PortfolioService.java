package home;

import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public class PortfolioService {
    private final Logger logger = LoggerFactory.getLogger(PortfolioService.class);
    private final HttpService httpService;
    private final WebSocketHandler wsh;

    @Value("${username}") private String username;
    @Value("${password}") private String password;

    public PortfolioService(HttpService httpService, WebSocketHandler wsh) {
        this.httpService = httpService;
        this.wsh = wsh;
    }

    public void portfolio() {
        String loginToken = httpService.login(username, password);
        if (loginToken == null) {
            throw new RuntimeException("Unable to get portfolio because the loginToken is null.");
        }
        BigDecimal equity = httpService.extendedHoursEquity(loginToken);
        if (equity != null) {
            wsh.send("PORTFOLIO: " + equity);
        }
    }
}
