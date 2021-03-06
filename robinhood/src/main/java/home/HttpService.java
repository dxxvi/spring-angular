package home;

import home.model.BuySellOrder;
import home.model.Quote;
import home.model.RobinhoodHistoricalQuoteResult;
import home.model.RobinhoodInstrumentsResult;
import home.model.RobinhoodOrderResult;
import home.model.RobinhoodOrdersResult;
import home.model.RobinhoodPositionResult;
import home.model.Tuple2;

import java.math.BigDecimal;
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

    RobinhoodOrdersResult nextOrders(String url, String loginToken);

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
    RobinhoodOrderResult buySell(BuySellOrder buySellOrder, String loginToken);

    BigDecimal extendedHoursEquity(String loginToken);

    RobinhoodInstrumentsResult getInstruments(String symbol);
}
