package home.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;

import java.util.Collection;
import java.util.Comparator;
import java.util.TreeSet;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class DB {
    private final Logger logger = LoggerFactory.getLogger(DB.class);
    private final BlockingQueue<Boolean> graphsReady = new LinkedBlockingQueue<>();
    private final BlockingQueue<Boolean> quotesReady = new LinkedBlockingQueue<>();

    private final Environment env;
    private final TreeSet<Stock> stocks;

    public DB(Environment env) {
        this.env = env;
        this.stocks = new TreeSet<>(Comparator.comparing(Stock::getSymbol));
    }

    public TreeSet<Stock> getStocks() {
        return new TreeSet<Stock>(stocks) {
            @Override public boolean add(Stock stock) {
                throw new UnsupportedOperationException();
            }

            @Override public boolean remove(Object o) {
                throw new UnsupportedOperationException();
            }

            @Override public void clear() {
                throw new UnsupportedOperationException();
            }

            @Override public boolean addAll(Collection<? extends Stock> c) {
                throw new UnsupportedOperationException();
            }
        };
    }

    public void graphsReady() {
        graphsReady.add(Boolean.TRUE);
    }

    public void quotesReady() {
        quotesReady.add(Boolean.TRUE);
    }

    // add if not exists and return the newly added. Or return the existing.
    public Stock addStock(Stock stock) {
        if (stock == null) {
            throw new IllegalArgumentException("don't accept null argument");
        }
        Stock ceiling = stocks.ceiling(stock);
        Stock floor   = stocks.floor(stock);
        if (ceiling != floor) {
            stocks.add(stock);
            return stock;
        }
        if (ceiling == null) {
            stocks.add(stock);
            return stock;
        }
        return ceiling;
    }
}
