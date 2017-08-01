package home;

import home.model.Quote;

import java.time.LocalTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

import static home.Utils.*;
import static java.util.stream.Collectors.*;

public class HttpServiceLocal implements HttpService {
    private LocalTime now = LocalTime.of(9, 30, 0);

    @Override public Collection<Quote> quotes(String wantedSymbols) {
        List<Quote> quotes = Stream.of(wantedSymbols.split(","))
                .map(s -> {
                    Quote q = new Quote();
                    q.setSymbol(s);
                    q.setPrice(randomQuotePrice());
                    q.setFrom(now);
                    q.setTo(now.plusSeconds(30));
                    return q;
                }).collect(toList());

        now = now.plusSeconds(30);
        return quotes;
    }
}
