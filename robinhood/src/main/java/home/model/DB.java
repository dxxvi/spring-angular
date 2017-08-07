package home.model;

import home.HttpService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.stream.DoubleStream;
import java.util.stream.Stream;

public class DB {
    private final Logger logger = LoggerFactory.getLogger(DB.class);
    private final HttpService httpService;
    private final BlockingQueue<Boolean> quotesReady = new LinkedBlockingQueue<>();
    private final Map<String, byte[]> graphs         = new ConcurrentHashMap<>(32);
    // a translation from instrument url to symbol
    private final Map<String, String> instrumentSymbolMap = new ConcurrentHashMap<>();
    private final Set<String> hiddenOrderIds = new ConcurrentSkipListSet<>();
    private final BlockingQueue<String> cancelledOrders = new LinkedBlockingQueue<>();
    private final Map<String, double[]> symbolHistoricalQuoteMap = new ConcurrentHashMap<>(32);
    private final BlockingQueue<BuySellOrder> buySellOrders = new LinkedBlockingQueue<>();

    private final Environment env;
    private final TreeSet<Stock> stocks;

    public DB(Environment env, HttpService httpService) {
        this.env = env;
        this.httpService = httpService;
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

    public void updateInstrumentSymbol(String instrument, String symbol) {
        instrumentSymbolMap.put(instrument, symbol);
    }

    public String getSymbolFromInstrument(String instrument) {
        String symbol = instrumentSymbolMap.get(instrument);
        if (symbol != null) {
            return symbol;
        }
        symbol = httpService.getSymbolFromInstrument(instrument);
        updateInstrumentSymbol(instrument, symbol);
        return symbol;
    }

    public void addHiddenOrderId(String orderId) {
        hiddenOrderIds.add(orderId);
    }

    public void addCancelledOrderId(String orderId) {
        cancelledOrders.add(orderId);
    }

    public String waitForCancelledOrder() {
        try {
            return cancelledOrders.take();
        }
        catch (InterruptedException iex) { /* who cares */ }
        return "not-existing-order-because-of-interrupted-exception";
    }

    public boolean shouldBeHidden(String orderId) {
        return hiddenOrderIds.contains(orderId);
    }

    public void addHistoricalQuotes(String symbol, double[] quotes) {
        symbolHistoricalQuoteMap.put(symbol, quotes);
    }

    public boolean hasHistoricalQuotes() {
        return !symbolHistoricalQuoteMap.isEmpty();
    }

    public int getWeekPercentage(String symbol, double price) {
        if (!symbolHistoricalQuoteMap.containsKey(symbol) || symbolHistoricalQuoteMap.get(symbol).length == 0) {
            return -1;
        }
        double[] array = symbolHistoricalQuoteMap.get(symbol);
        long n = DoubleStream.of(array).filter(a -> a > price).count();
        return Math.round((float)n / (float)(array.length) * 100f);
    }

    public void addBuySellOrder(BuySellOrder buySellOrder) {
        buySellOrders.add(buySellOrder);
    }
}
