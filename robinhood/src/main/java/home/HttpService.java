package home;

import home.model.BuySellOrder;
import home.model.Quote;
import home.model.RobinhoodHistoricalQuoteResult;
import home.model.RobinhoodOrdersResult;
import home.model.RobinhoodPositionResult;
import home.model.Tuple2;

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

    // get historical quotes for a week
    List<RobinhoodHistoricalQuoteResult> getHistoricalQuotes(String wantedSymbols);

    // get historical quotes for today
    List<RobinhoodHistoricalQuoteResult> getTodayHistoricalQuotes(String wantedSymbols);

    /**
     * @return the orderId and state of this order or null if errors
     */
    Tuple2<String, String> buySell(BuySellOrder buySellOrder, String loginToken);
}
