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
        LinkedList<Quote> quotes = new LinkedList<>(_quotes);
        int n = quotes.size();
        if (n < 3) return new byte[0];

        double[] x = new double[n], y = new double[n];
        double xmin = Main.OPEN.until(quotes.peekFirst().getUpdatedAt().toLocalTime(), ChronoUnit.SECONDS);
        double xmax = Main.OPEN.until(quotes.peekLast().getUpdatedAt().toLocalTime(), ChronoUnit.SECONDS);
        double ymin = Double.MAX_VALUE, ymax = Double.MIN_VALUE;
        for (Quote q : quotes) {
            double price = q.getPrice().doubleValue();
            if (ymin > price) {
                ymin = price;
            }
            if (ymax < price) {
                ymax = price;
            }
        }
        int i = 0;
        for (Quote q : quotes) {
            double xi = Main.OPEN.until(q.getUpdatedAt().toLocalTime(), ChronoUnit.SECONDS);
            x[i] = (double)width * (xi - xmin) / (xmax -xmin);
            double yi = q.getPrice().doubleValue();
            y[i] = 1d + ((double)height - 3d) * (yi - ymin) / (ymax - ymin);
            i++;
        }
        PolynomialSplineFunction psf = new SplineInterpolator().interpolate(x, y);

        BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_BYTE_GRAY);
        Graphics2D g2d = bi.createGraphics();

        g2d.setColor(new Color(255, 255, 255));
        g2d.fillRect(0, 0, width, height);

        g2d.setColor(new Color(82,82, 82));
        g2d.setStroke(new BasicStroke(1f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        for (double currentPointX = 0; currentPointX <= width; currentPointX++) {
            double currentPointY = psf.value(currentPointX);
            g2d.drawLine((int)currentPointX, height, (int)currentPointX, height - (int)Math.round(currentPointY));
        }
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
