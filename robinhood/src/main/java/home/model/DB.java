package home.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

import java.math.BigDecimal;
import static java.util.Comparator.*;

import java.util.LinkedList;
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
    private final BlockingQueue<Boolean> quotesReady = new LinkedBlockingQueue<>();
    private final Map<String, byte[]> graphs         = new ConcurrentHashMap<>(32);
    // a translation from instrument url to symbol
    private final Map<String, String> instrumentSymbolMap = new ConcurrentHashMap<>();
    private final Set<String> hiddenOrderIds = new ConcurrentSkipListSet<>();
    private final BlockingQueue<String> cancelledOrders = new LinkedBlockingQueue<>();
    // keeps the historical quotes for a week
    private final Map<String, double[]> symbolHistoricalQuoteMap = new ConcurrentHashMap<>(32);
    private final BlockingQueue<BuySellOrder> buySellOrders = new LinkedBlockingQueue<>();
    private final TreeSet<BuySellOrder> buySellOrdersNeedFlipped;

    private final Environment env;
    private final TreeSet<Stock> stocks;

    public DB(Environment env) {
        this.env = env;
        this.stocks = new TreeSet<>(comparing(Stock::getSymbol));
        this.buySellOrdersNeedFlipped = new TreeSet<>(comparing(BuySellOrder::getId));
    }

    public Stream<Stock> getStocksStream() {
        return stocks.stream();
    }

    public void quotesReady(Boolean createGraph) {
        quotesReady.add(createGraph);
    }

    public Boolean waitTillQuotesReady() {
        try {
            do {
                Boolean createGraph = quotesReady.take();
                if (quotesReady.isEmpty()) {
                    return createGraph;
                }
            } while (true);
        }
        catch (InterruptedException iex) { /* who cares */ }
        return Boolean.FALSE;
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
        return stocks.stream().map(stock -> {
            LinkedList<Quote> quotes = stock.getQuotes().stream()
                    .filter(q -> q.getFrom().getSecond() % 15 == 0)
                    .map(q -> q.getTo().getSecond() % 15 == 0 ? q : q.setTo(q.getFrom().plusSeconds(15)))
                    .collect(LinkedList<Quote>::new, LinkedList::add, LinkedList::addAll);
            return new Tuple2<>(stock.getSymbol(), quotes);
        });
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
        return instrumentSymbolMap.get(instrument);
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

    public Tuple2<BigDecimal, BigDecimal> getWeekMinMax(String symbol) {
        if (!symbolHistoricalQuoteMap.containsKey(symbol) || symbolHistoricalQuoteMap.get(symbol).length == 0) {
            return null;
        }
        MinMaxDoubleTuple2 mmdt2 = DoubleStream.of(symbolHistoricalQuoteMap.get(symbol))
                .collect(
                        () -> new MinMaxDoubleTuple2(Double.MAX_VALUE, Double.MIN_VALUE),
                        MinMaxDoubleTuple2::consume,
                        MinMaxDoubleTuple2::combine
                );
        return new Tuple2<>(new BigDecimal(mmdt2._1), new BigDecimal(mmdt2._2));
    }

    public void addBuySellOrder(BuySellOrder buySellOrder) {
        buySellOrders.add(buySellOrder);
    }

    public BuySellOrder waitForBuySellOrder() {
        try {
            return buySellOrders.take();
        }
        catch (InterruptedException iex) {
            throw new RuntimeException("Fix me", iex);
        }
    }

    public void addBuySellOrderNeedsFlipped(BuySellOrder bso) {
        if (bso.getId() == null) {
            throw new RuntimeException("buySellOrder id is null: " + bso);
        }
        synchronized (buySellOrdersNeedFlipped) {
            buySellOrdersNeedFlipped.add(bso);
        }
    }

    /**
     * @return null if this orderId is not of a buy order that needs to be resold
     */
    public BuySellOrder getBuySellOrderNeedsFlipped(String id) {
        synchronized (buySellOrdersNeedFlipped) {
            BuySellOrder bso = buySellOrdersNeedFlipped.ceiling(new BuySellOrder(id));
            if (bso != null && bso.getId().equals(id)) {
                return bso;
            }
        }
        return null;
    }

    public void removeBuySellOrderNeedsFlipped(String id) {
        synchronized (buySellOrdersNeedFlipped) {
            BuySellOrder bso = buySellOrdersNeedFlipped.ceiling(new BuySellOrder(id));
            if (bso != null && bso.getId().equals(id)) {
                buySellOrdersNeedFlipped.remove(bso);
            }
        }
    }
}
