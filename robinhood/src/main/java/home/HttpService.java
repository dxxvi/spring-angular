package home;

import home.model.Quote;

import java.util.Collection;

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
}
