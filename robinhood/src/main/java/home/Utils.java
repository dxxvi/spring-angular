package home;

import home.model.Quote;
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
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.Random;
import java.util.TimeZone;

import static java.time.temporal.ChronoUnit.SECONDS;

public abstract class Utils {
    private static final Logger logger = LoggerFactory.getLogger(Utils.class);
    private static final Random random = new Random();
    private static int robinhoodAndMyTimeDifference = Integer.MIN_VALUE;

    static byte[] drawGraph(int width, int height, LinkedList<Quote> _quotes) {
        return new byte[] { 1 };
    }

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
}
