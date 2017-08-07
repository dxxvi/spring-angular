package home;

import home.model.Quote;
import home.model.RobinhoodHistoricalQuoteResult;
import home.model.RobinhoodOrdersResult;
import home.model.RobinhoodPositionResult;

import java.util.Collection;
import java.util.List;

public interface HttpService {
    /**
     * @param wantedSymbols e.g. AMD,INTC,ON
     * @return a collection
     * Might throw a runtime exception
     */
    Collection<Quote> quotes(String wantedSymbols);

    // returns a login token
    String login(String username, String password);

    String accountUrl(String loginToken);

    RobinhoodOrdersResult orders(String loginToken);

    String getSymbolFromInstrument(String instrument);

    List<RobinhoodPositionResult> positions(String loginToken);

    void cancelOrder(String orderId, String loginToken);

    List<RobinhoodHistoricalQuoteResult> getHistoricalQuotes(String wantedSymbols);
}
