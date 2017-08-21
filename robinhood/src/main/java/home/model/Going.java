package home.model;

import java.math.BigDecimal;

public class Going {
    private final long duration;
    private final BigDecimal from;
    private final BigDecimal to;

    public Going(long duration, BigDecimal from, BigDecimal to) {
        this.duration = duration;
        this.from = from;
        this.to = to;
    }

    public long getDuration() {
        return duration;
    }

    public BigDecimal getFrom() {
        return from;
    }

    public BigDecimal getTo() {
        return to;
    }

    @Override
    public String toString() {
        return "Going {" +
                "duration=" + duration + "s" +
                ", from=" + from +
                ", to=" + to +
                '}';
    }
}
