package home;

import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.BuySellOrder;
import home.model.Quote;
import home.model.RobinhoodHistoricalQuoteResult;
import home.model.RobinhoodOrdersResult;
import home.model.RobinhoodPositionResult;
import home.model.Tuple2;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import static home.Utils.*;
import static java.util.stream.Collectors.*;

public class HttpServiceLocal implements HttpService {
    private final ObjectMapper objectMapper;
    private LocalTime now = LocalTime.of(9, 30, 0);

    public HttpServiceLocal(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override public Collection<Quote> quotes(String wantedSymbols) {
        List<Quote> quotes = Stream.of(wantedSymbols.split(","))
                .map(s -> {
                    Quote q = new Quote();
                    q.setSymbol(s);
                    q.setPrice(randomQuotePrice());
                    q.setFrom(now);
                    q.setTo(now.plusSeconds(30));
                    return q;
                })
                .collect(toList());

        now = now.plusSeconds(30);
        return quotes;
    }

    @Override public String login(String username, String password) {
        return "Fake_token";
    }

    @Override public String accountUrl(String loginToken) {
        return "Fake_account_url";
    }

    @Override public RobinhoodOrdersResult orders(String loginToken) {
        try (InputStream is = HttpServiceLocal.class.getResourceAsStream("/orders.json")) {
            return objectMapper.readValue(is, RobinhoodOrdersResult.class);
        }
        catch (IOException ioex) {
            throw new RuntimeException(ioex);
        }
    }

    @Override public String getSymbolFromInstrument(String instrument) {
        return null;
    }

    @Override public List<RobinhoodPositionResult> positions(String loginToken) {
        return Collections.emptyList();
    }

    @Override public void cancelOrder(String orderId, String loginToken) {
    }

    @Override public List<RobinhoodHistoricalQuoteResult> getHistoricalQuotes(String wantedSymbols) {
        return Collections.emptyList();
    }

    @Override public List<RobinhoodHistoricalQuoteResult> getTodayHistoricalQuotes(String wantedSymbols) {
        return Collections.emptyList();
    }

    @Override public Tuple2<String, String> buySell(BuySellOrder buySellOrder, String loginToken) {
        return new Tuple2<>("0C12-5A8B-DE17", "confirmed");
    }
}
