package home;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.DB;
import home.model.Stock;
import home.model.StockDO;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static java.util.stream.Collectors.toList;

public class QuotesReadyThread extends Thread {
    private final Logger logger = LoggerFactory.getLogger(QuotesReadyThread.class);

    private final DB db;
    private final int width;
    private final int height;
    private final WebSocketHandler qwsh;
    private final ObjectMapper objectMapper;

    public QuotesReadyThread(DB db, int width, int height, WebSocketHandler qwsh, ObjectMapper objectMapper) {
        this.db = db;
        this.width = width;
        this.height = height;
        this.qwsh = qwsh;
        this.objectMapper = objectMapper;
    }

    @Override public void run() {
        while (true) {
            db.waitTillQuotesReady();

            try {
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
                qwsh.send("QUOTES: " + s);
            }
            catch (JsonProcessingException jpex) {
                logger.error("Fix me.", jpex);
            }

            // generate graphs TODO should we put this in another thread?
            db.getStocksToDrawGraphs().forEach(t -> {
                db.addGraph(t._1(), Utils.drawGraph(width, height, Main.OPEN, Main.CLOSE, t._2()));
            });
            qwsh.send("GRAPHS: ");
        }
    }
}
