package home;

import home.model.DB;
import home.model.Order;
import home.model.Quote;
import home.model.RobinhoodOrderResult;
import home.model.RobinhoodOrdersResult;
import home.model.Tuple2;
import org.apache.commons.math3.analysis.interpolation.SplineInterpolator;
import org.apache.commons.math3.analysis.polynomials.PolynomialSplineFunction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.MathContext;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.Map;
import java.util.Random;
import java.util.SortedSet;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Function;

import static java.time.temporal.ChronoUnit.SECONDS;
import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toCollection;

public abstract class Utils {
    private static final Logger logger = LoggerFactory.getLogger(Utils.class);
    private static final Random random = new Random();
    private static int robinhoodAndMyTimeDifference = -5 /* Integer.MIN_VALUE */;

    static BigDecimal randomQuotePrice() {
        return new BigDecimal(random.nextInt(30) + 10 + "." + random.nextInt(100));
    }

    // add the returned number (of hours) to Robinhood time to get my time
    static int robinhoodAndMyTimeDifference() {
        if (robinhoodAndMyTimeDifference == Integer.MIN_VALUE) {
            TimeZone timeZone = Calendar.getInstance().getTimeZone();
            robinhoodAndMyTimeDifference = (timeZone.getRawOffset() + timeZone.getDSTSavings()) / 3600 / 1000;
        }
        return robinhoodAndMyTimeDifference;
    }

    static Order toOrder(RobinhoodOrderResult ror, DB db, HttpService httpService) {
        Order order = ror.toOrder();
        order.setSymbol(db.getSymbolFromInstrument(ror.getInstrument()));
        return order;
    }

    static Map<String, SortedSet<Order>> buildSymbolOrdersMap(
            RobinhoodOrdersResult robinhoodOrdersResult, DB db, HttpService httpService) {
        return robinhoodOrdersResult.getResults().stream()
                .peek(ror -> {
                    if ("cancelled".equals(ror.getState()) && ror.getCumQuantity().intValue() > 0) {
                        ror.setState("filled");
                        ror.setQuantity(ror.getCumQuantity());
                    }
                })
                .filter(ror -> !"cancelled".equals(ror.getState()) && !"failed".equals(ror.getState()))
                .filter(ror -> !db.shouldBeHidden(ror.getId()))
                .map(ror -> {
                    Order order = toOrder(ror, db, httpService);
                    if (order.getSymbol() == null) {
                        System.out.println("Getting symbol for instrument " + ror.getInstrument());
                        String symbol = httpService.getSymbolFromInstrument(ror.getInstrument());
                        db.updateInstrumentSymbol(ror.getInstrument(), symbol);
                        order.setSymbol(symbol);
                    }
                    return order;
                })
                .collect(groupingBy(
                        Order::getSymbol,
                        mapping(
                                Function.identity(),
                                toCollection(() -> new ConcurrentSkipListSet<>(comparing(Order::getCreatedAt)))
                        )
                ));
    }
}
