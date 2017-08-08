package home.web.socket.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import home.Main;
import home.OrderService;
import home.QuoteService;
import home.model.BuySellOrder;
import home.model.DB;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebSocketHandler extends TextWebSocketHandler {
    private final Logger logger = LoggerFactory.getLogger(WebSocketHandler.class);
    private final DB db;
    private final ObjectMapper objectMapper;

    private WebSocketSession session;

    public WebSocketHandler(DB db, ObjectMapper objectMapper) {
        this.db = db;
        this.objectMapper = objectMapper;
    }

    @Override public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        logger.debug("Quote websocket connection established, send it the graph height.");
        this.session = session;
        send("GRAPH HEIGHT: " + Main.graphHeight);
    }

    @Override public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        this.session = null;
    }

    @Override protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws Exception {
        String message = textMessage.getPayload();
        logger.debug("Receive: {}", message);
        if (message.startsWith("HIDE ORDER: ")) {
            db.addHiddenOrderId(message.replace("HIDE ORDER: ", ""));
        }
        else if (message.startsWith("CANCEL ORDER: ")) {
            db.addCancelledOrderId(message.replace("CANCEL ORDER: ", ""));
        }
        else if (message.startsWith("BUY SELL: ")) {
            try {
                BuySellOrder buySellOrder = objectMapper.readValue(
                            message.replace("BUY SELL: ", ""), BuySellOrder.class);
                db.addBuySellOrder(buySellOrder);
            }
            catch (Exception ex) {
                throw new RuntimeException("Fix me: " + message, ex);
            }
        }
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
