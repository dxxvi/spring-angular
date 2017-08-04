package home.web.socket.handler;

import home.Main;
import home.OrderService;
import home.QuoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebSocketHandler extends TextWebSocketHandler {
    private final Logger logger = LoggerFactory.getLogger(WebSocketHandler.class);

    private WebSocketSession session;

    @Override public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        logger.debug("Quote websocket connection established, send it the graph height.");
        this.session = session;
        send("GRAPH HEIGHT: " + Main.graphHeight);
    }

    @Override public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        this.session = null;
    }

    @Override protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        logger.debug("Receive: {}", message.getPayload());
    }

    public void send(String message) {
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(new TextMessage(message));
            }
            catch (Exception ex) {
                logger.warn("Unable to send message to client", ex);
            }
        }
        else {
            logger.info("No open session to use.");
        }
    }
}
