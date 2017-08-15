package home;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.DB;
import home.model.Position;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import static java.util.stream.Collectors.*;

public class PositionService {
    private final Logger logger = LoggerFactory.getLogger(PositionService.class);
    private final HttpService httpService;
    private final DB db;
    private final WebSocketHandler wsh;
    private final ObjectMapper objectMapper;

    @Value("${username}") private String username;
    @Value("${password}") private String password;

    public PositionService(DB db, HttpService httpService, WebSocketHandler wsh, ObjectMapper objectMapper) {
        this.db = db;
        this.httpService = httpService;
        this.wsh = wsh;
        this.objectMapper = objectMapper;
    }

    @Scheduled(cron = "10/30 0/1 * * * *")
    public void positions() {
/*
        LocalTime now = LocalTime.now();
        if (now.until(Main.OPEN, ChronoUnit.MINUTES) > 5 || now.until(Main.CLOSE, ChronoUnit.MINUTES) < 0) {
            return;
        }
*/

        String loginToken = httpService.login(username, password);
        if (loginToken == null) {
            throw new RuntimeException("Unable to get orders because the loginToken is null.");
        }
        Map<String, Position> positionMap = httpService.positions(loginToken).stream()
                .map(rpr -> {
                    Position position = rpr.toPosition();
                    String symbol = db.getSymbolFromInstrument(rpr.getInstrument());
                    if (symbol == null) {
                        symbol = httpService.getSymbolFromInstrument(rpr.getInstrument());
                        db.updateInstrumentSymbol(rpr.getInstrument(), symbol);
                    }
                    position.setSymbol(symbol);
                    return position;
                })
                .collect(toMap(Position::getSymbol, Function.identity()));

        try {
            wsh.send("POSITIONS: " + objectMapper.writeValueAsString(positionMap));
        }
        catch (JsonProcessingException jpex) {
            logger.error("Fix me.", jpex);
        }
    }
}
