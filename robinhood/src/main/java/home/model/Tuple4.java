package home.model;

public class Tuple4<U, V, X, Y> {
    final U _1;
    final V _2;
    final X _3;
    final Y _4;

    public Tuple4(U _1, V _2, X _3, Y _4) {
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;
        this._4 = _4;
    }

    public U _1() {
        return _1;
    }

    public V _2() {
        return _2;
    }

    public X _3() {
        return _3;
    }

    public Y _4() {
        return _4;
    }
}
