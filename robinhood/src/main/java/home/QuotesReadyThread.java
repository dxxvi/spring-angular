package home;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.DB;
import home.model.StockDO;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static java.util.stream.Collectors.toList;

public class QuotesReadyThread extends Thread {
    private final Logger logger = LoggerFactory.getLogger(QuotesReadyThread.class);

    private final DB db;
    private final WebSocketHandler wsh;
    private final ObjectMapper objectMapper;

    public QuotesReadyThread(DB db, WebSocketHandler wsh, ObjectMapper objectMapper) {
        this.db = db;
        this.wsh = wsh;
        this.objectMapper = objectMapper;
    }

    @Override public void run() {
        while (true) {
            try {
                db.waitTillQuotesReady();
                // send the quotes to browser
                String s = objectMapper.writeValueAsString(
                        db.getStocksStream()
                                .map(stock -> {
                                    StockDO stockDO = stock.minified();
                                    stockDO.setWeekPercentage(db.getWeekPercentage(
                                            stock.getSymbol(), stockDO.getPrice().doubleValue()));
                                    return stockDO;
                                })
                                .collect(toList())
                );
                wsh.send("QUOTES: " + s);
            }
            catch (JsonProcessingException jpex) {
                logger.error("Fix me.", jpex);
            }
            catch (Exception ex) {
                logger.warn("This exception is caught ", ex);
            }
        }
    }
}
