package home.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

import java.util.Collection;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.stream.Stream;

public class DB {
    private final Logger logger = LoggerFactory.getLogger(DB.class);
    private final BlockingQueue<Boolean> quotesReady = new LinkedBlockingQueue<>();
    private final Map<String, byte[]> graphs         = new ConcurrentHashMap<>();

    private final Environment env;
    private final TreeSet<Stock> stocks;

    public DB(Environment env) {
        this.env = env;
        this.stocks = new TreeSet<>(Comparator.comparing(Stock::getSymbol));
    }

    public Stream<Stock> getStocksStream() {
        return stocks.stream();
    }

    public void quotesReady() {
        quotesReady.add(Boolean.TRUE);
    }

    public void waitTillQuotesReady() {
        try {
            do {
                quotesReady.take();
                if (quotesReady.isEmpty()) {
                    break;
                }
            } while (true);
        }
        catch (InterruptedException iex) { /* who cares */ }
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

    public Stream<Tuple2<String, LinkedList<Quote>>> getStocksToDrawGraphs() {
        return stocks.stream().map(stock -> new Tuple2<>(stock.getSymbol(), stock.getQuotes()));
    }

    public void addGraph(String symbol, byte[] graph) {
        graphs.put(symbol, graph);
    }

    public byte[] getGraph(String symbol) {
        byte[] result = graphs.get(symbol);
        if (result == null) {
            return new byte[] {};
        }
        return result;
    }
}
