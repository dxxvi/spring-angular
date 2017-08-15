package home.model;

public class MinMaxDoubleTuple2 extends DoubleTuple2 {
    public MinMaxDoubleTuple2(double _1, double _2) {
        super(_1, _2);
    }

    public void consume(double d) {
        if (d < _1) {
            _1 = d;
        }
        if (d > _2) {
            _2 = d;
        }
    }

    public MinMaxDoubleTuple2 combine(MinMaxDoubleTuple2 mmdt2) {
        return new MinMaxDoubleTuple2(Math.min(_1, mmdt2._1), Math.max(_2, mmdt2._2));
    }
}
