package home.model;

public class Tuple2<U, V> {
    final U _1;
    final V _2;

    public Tuple2(U _1, V _2) {
        this._1 = _1;
        this._2 = _2;
    }

    public U _1() {
        return _1;
    }

    public V _2() {
        return _2;
    }
}
