package home;

import home.model.Quote;
import home.model.RobinhoodOrdersResult;
import home.model.RobinhoodPosition;

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

    List<RobinhoodPosition> positions(String loginToken);
}
