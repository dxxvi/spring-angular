package home;

import home.web.socket.handler.QuoteWebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer {
    private final Logger logger = LoggerFactory.getLogger(WebSocketConfiguration.class);
    private final QuoteWebSocketHandler quoteWebSocketHandler;

    public WebSocketConfiguration(QuoteWebSocketHandler quoteWebSocketHandler) {
        this.quoteWebSocketHandler = quoteWebSocketHandler;
    }

    @Override public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        logger.debug("Register quoteWebSocketHandler.");
        webSocketHandlerRegistry.addHandler(quoteWebSocketHandler, "/websocket/quotes");
    }
}
