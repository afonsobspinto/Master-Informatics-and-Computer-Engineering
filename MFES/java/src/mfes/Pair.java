package mfes;

public class Pair<F, S> {
    public final F first;
    public final S second;

    public Pair(F f, S s) {
        first = f;
        second = s;
    }

    public static <F, S> Pair<F, S> of(F f, S s) {
        return new Pair<>(f, s);
    }
}
