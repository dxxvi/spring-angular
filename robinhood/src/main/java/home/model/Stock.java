package home.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.function.IntBinaryOperator;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

public class Stock extends StockDO {
    private static final int N = 20;
    private transient final Logger logger = LoggerFactory.getLogger(Stock.class);

    private transient double[] profits = new double[N];
    private transient int profitsLength = 0;
    private transient Order[] _orders = new Order[N];
    private transient int _ordersLength = 0;
    private transient Order autoRunSell;

    private ConcurrentLinkedQueue<Quote> quotes;

    private int heldForSells;
    private int quantity;
    private BigDecimal averageBuyPrice;

    public Stock() {}
    public Stock(String symbol, String instrument) {
        super(symbol, instrument);
    }

    public Quote getLatestQuote() {
        if (quotes == null || quotes.isEmpty()) {
            return null;
        }
        return new LinkedList<>(quotes).peekLast();
    }

    public void addQuote(Quote q) {
        if (quotes == null || quotes.isEmpty()) {
            quotes = new ConcurrentLinkedQueue<>(Collections.singleton(q));
        }
        else {
            Quote lastQ = new LinkedList<>(quotes).getLast();
            int h1 = lastQ.getUpdatedAt().getHour();
            int m1 = lastQ.getUpdatedAt().getMinute();
            int s1 = lastQ.getUpdatedAt().getSecond();
            int h2 = q.getUpdatedAt().getHour();
            int m2 = q.getUpdatedAt().getMinute();
            int s2 = q.getUpdatedAt().getSecond();
            if (h1 != h2 || m1 != m2 || s1 != s2) {
                quotes.add(q);
                price = q.getPrice();
            }
        }

        recalculateDayMinMax(q);
    }

    public void addQuotes(Collection<Quote> newQuotes) {
        if (quotes == null) {
            quotes = new ConcurrentLinkedQueue<>();
        }

        SortedSet<Quote> set = new TreeSet<>(Comparator.comparing(Quote::getUpdatedAt));
        set.addAll(newQuotes);
        set.addAll(quotes);
        quotes.clear();
        quotes.addAll(set);
    }

    private void recalculateDayMinMax(Quote q) {
        if (dayMax.compareTo(q.getPrice()) < 0) {
            dayMax = q.getPrice();
        }
        if (dayMin.compareTo(q.getPrice()) > 0) {
            dayMin = q.getPrice();
        }
    }

    public Quote getFirstQuoteOfDay() {
        if (quotes == null) {
            return null;
        }
        Quote result = null;
        Iterator<Quote> iterator = quotes.iterator();
        while (iterator.hasNext()) {   // I don't use forEach because the iterator is said to go from head to tail
            result = iterator.next();
        }
        return result;
    }

    public ConcurrentLinkedQueue<Quote> getQuotes() {
        return quotes;
    }

    @Override public int getDayPercentage() {
        if (price == null) {
            return 0;
        }
        long n = quotes.stream().filter(q -> price.compareTo(q.getPrice()) < 0).count();
        return Math.round((float)n / (float)(quotes.size()) * 100f);
    }

    public StockDO minified() {
        BigDecimal last5minsMin = null, last5minsMax = null;
        Tuple2<BigDecimal, BigDecimal> minMaxLast5Mins = getMinMaxLast15Mins();
        if (minMaxLast5Mins != null) {
            last5minsMin = minMaxLast5Mins._1;
            last5minsMax = minMaxLast5Mins._2;
        }
        Quote latestQuote = getLatestQuote();
        LocalDateTime ua = latestQuote.getUpdatedAt();
        return new StockDO(symbol, instrument, latestQuote.getPrice(), dayMin, dayMax, day5Min, day5Max, orders,
                getDayPercentage(), last5minsMin, last5minsMax,
                ua.getYear(), ua.getMonthValue(), ua.getDayOfMonth(), ua.getHour(), ua.getMinute(), ua.getSecond())
                .setAutoRun(isAutoRun());
    }

    private Tuple2<BigDecimal, BigDecimal> getMinMaxLast15Mins() {
        if (quotes == null || quotes.isEmpty()) {
            return null;
        }
        LinkedList<Quote> _quotes = new LinkedList<>(quotes);
        BigDecimal min = BigDecimal.valueOf(Double.MAX_VALUE);
        BigDecimal max = BigDecimal.valueOf(Double.MIN_VALUE);
        Quote lastQuote = _quotes.pollLast();
        Quote q = lastQuote;
        while (q != null && q.getUpdatedAt() != null
                && q.getUpdatedAt().until(lastQuote.getUpdatedAt(), ChronoUnit.SECONDS) < 601) {
            min = min.compareTo(q.getPrice()) > 0 ? q.getPrice() : min;
            max = max.compareTo(q.getPrice()) < 0 ? q.getPrice() : max;
            q = _quotes.pollLast();
        }
        return new Tuple2<>(min, max);
    }

    @Override
    public String toString() {
        return "Stock {" +
                "symbol='" + symbol + '\'' +
                ", price=" + price +
                ", dayMin=" + dayMin +
                ", dayMax=" + dayMax +
                ", day5Min=" + day5Min +
                ", day5Max=" + day5Max +
                ", weekPercentage=" + weekPercentage +
                ", dayPercentage=" + dayPercentage +
                '}';
    }

    public Stock clone() {             // to remove the orders
        Stock replica = new Stock(symbol, instrument);
        quotes.forEach(replica::addQuote);
        return replica;
    }

    public int getHeldForSells() {
        return heldForSells;
    }

    public Stock setHeldForSells(int heldForSells) {
        this.heldForSells = heldForSells;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public Stock setQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }

    public BigDecimal getAverageBuyPrice() {
        return averageBuyPrice;
    }

    public Stock setAverageBuyPrice(BigDecimal averageBuyPrice) {
        this.averageBuyPrice = averageBuyPrice;
        return this;
    }

    public void startAutorun(Order order) {
        autoRun = true;
        profitsLength = 1;
        profits[profitsLength - 1] = 0;
        _ordersLength = 1;
        _orders[_ordersLength - 1] = order;
    }

    public Order getLastAutoRunOrder() {
        return _orders[_ordersLength - 1];
    }

    public Order getAutoRunSellOrder() {
        return autoRunSell;
    }

    public void setAutoRunSellOrder(Order o) {
        autoRunSell = o;
    }

    public void addAutoRunBuyOrder(Order o) {
        _ordersLength ++;
        _orders[_ordersLength - 1] = o;
    }

    public void cancelAutoRun() {
        autoRun = false;
        autoRunSell = null;
        profitsLength = 0;
        _ordersLength = 0;
    }

    public Tuple2<Integer, Double> calculateQuantityAndPrice() {
        double cost = 0;
        int quantity = 0;
        for (int i = 0; i < _ordersLength && "filled".equals(_orders[i].getState()); i++) {
            quantity += _orders[i].getQuantity();
            cost += (double)_orders[i].getQuantity() * _orders[i].getPrice().doubleValue();
        }
        return new Tuple2<>(quantity, cost);
    }

    // why BuySellOrder? because we'll use HttpService.buySell.
    public BuySellOrder createAutoRunSellOrder(int quantity) {
        BuySellOrder bso = new BuySellOrder();
        bso.setInstrument(getInstrument());
        bso.setSymbol(getSymbol());
        bso.setQuantity(quantity);
        bso.setSide("sell");
        bso.setPrice(_orders[0].getPrice());
        getLastFilledOrder().ifPresent(o -> {
            if (quantity < 5) {
                bso.setPrice(o.getPrice().add(new BigDecimal(0.08)));
            }
            else if (quantity < 20) {
                bso.setPrice(o.getPrice().add(new BigDecimal(0.07)));
            }
            else if (quantity < 100) {
                bso.setPrice(o.getPrice().add(new BigDecimal(0.05)));
            }
            else if (quantity < 500) {
                bso.setPrice(o.getPrice().add(new BigDecimal(0.04)));
            }
            else {
                bso.setPrice(o.getPrice().add(new BigDecimal(0.03)));
            }
        });
        return bso;
    }

    // calculate the price for the autoRun buy order
    public double calculatePriceForNextAutoRunBuyOrder() {
        Order lastAutoRunOrder = getLastAutoRunOrder();
        if (_ordersLength == 1) {
            return lastAutoRunOrder.getPrice().doubleValue() - 0.04;
        }
        else if (_ordersLength == 2) {
            return lastAutoRunOrder.getPrice().doubleValue() - 0.03;
        }
        else if (_ordersLength == 3) {
            return lastAutoRunOrder.getPrice().doubleValue() - 0.03;
        }
        else {
            return lastAutoRunOrder.getPrice().doubleValue() - 0.03;
        }
    }

    public BuySellOrder createAutoRunBuyOrder(int quantity, double price) {
        BuySellOrder bso = new BuySellOrder();
        bso.setInstrument(getInstrument());
        bso.setSymbol(getSymbol());
        bso.setQuantity(quantity);
        bso.setSide("buy");
        bso.setPrice(new BigDecimal(price));
        return bso;
    }

    private Optional<Order> getLastFilledOrder() {
        for (int i = _ordersLength - 1; i >= 0; i--) {
            if ("filled".equals(_orders[i].getState())) {
                return Optional.of(_orders[i]);
            }
        }
        return Optional.empty();
    }
}
