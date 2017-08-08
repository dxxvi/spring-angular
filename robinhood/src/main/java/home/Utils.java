package home;

import home.model.Quote;
import home.model.Tuple2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.MathContext;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.Random;
import java.util.TimeZone;

import static java.time.temporal.ChronoUnit.SECONDS;

public abstract class Utils {
    private static final Logger logger = LoggerFactory.getLogger(Utils.class);
    private static final Random random = new Random();

    static byte[] drawGraph(int width, int height, LocalTime open, LocalTime close, LinkedList<Quote> quotes) {
        final BigDecimal D = new BigDecimal(0.01);
        final BigDecimal secs = new BigDecimal(open.until(close, SECONDS));

        Tuple2<BigDecimal, BigDecimal> minMax = quotes.stream().reduce(
                new Tuple2<>(BigDecimal.valueOf(999), BigDecimal.valueOf(-1)),
                (t, q) -> new Tuple2<>(t._1().min(q.getPrice()), t._2().max(q.getPrice())),
                (t1, t2) -> new Tuple2<>(t1._1().min(t2._1()), t1._2().max(t2._2()))
        );

        BigDecimal MIN = minMax._1().equals(minMax._2()) ? minMax._1().subtract(new BigDecimal(1)): minMax._1().subtract(D);
        BigDecimal MAX = minMax._1().equals(minMax._2()) ? minMax._2().add(new BigDecimal(1)) : minMax._2().add(D);

        BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_BYTE_GRAY);
        Graphics2D g2d = bi.createGraphics();

        g2d.setColor(new Color(241, 241, 241));
        g2d.fillRect(0, 0, width, height);

        int factor = calculateMagnifyingFactor(open.until(quotes.getLast().getTo(), SECONDS), secs.longValue());

        g2d.setColor(new Color(194,194, 194));
        quotes.forEach(q -> {
            float _h = q.getPrice().subtract(MIN).divide(MAX.subtract(MIN), MathContext.DECIMAL32)
                    .multiply(new BigDecimal(height)).floatValue();
            float _x = new BigDecimal(open.until(q.getFrom(), SECONDS)).multiply(new BigDecimal(width*factor))
                    .divide(secs, MathContext.DECIMAL32).floatValue();
            float _w = new BigDecimal(q.getFrom().until(q.getTo(), SECONDS)).multiply(new BigDecimal(width*factor))
                    .divide(secs, MathContext.DECIMAL32).floatValue();
            int h = Math.round(_h);
            int x = Math.round(_x);
            int w = Math.round(_w);
            g2d.fillRect(x, height - h, w, h);
        });

        g2d.dispose();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ImageIO.write(bi, "png", baos);
        }
        catch (Exception ex) {
            logger.error("Fix me.", ex);
        }
        return baos.toByteArray();
    }

    private static int calculateMagnifyingFactor(long z, long b) {
        int factor = 1;
        if (z * 10 < b) {
            factor = 10;
        }
        else if (z * 7 < b) {
            factor = 7;
        }
        else if (z * 4 < b) {
            factor = 4;
        }
        else if (z * 3 < b) {
            factor = 3;
        }
        else if (z * 2 < b) {
            factor = 2;
        }
        return factor;
    }

    static BigDecimal randomQuotePrice() {
        return new BigDecimal(random.nextInt(30) + 10 + "." + random.nextInt(100));
    }

    // add the returned number (of hours) to Robinhood time to get my time
    static int robinhoodAndMyTimeDifference() {
        TimeZone timeZone = Calendar.getInstance().getTimeZone();
        return (timeZone.getRawOffset() + timeZone.getDSTSavings()) / 3600 / 1000;
    }
}
