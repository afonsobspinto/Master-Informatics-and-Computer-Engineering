package src;


public class Descriptor {

    private final Type type;
    private final String scope;

    public Descriptor(Type type, String scope) { //TODO: Find a way to get type from string
        this.type = type;
        this.scope = scope;

    }

    public Type getType() { return type; }
    public String getScope() { return scope; }

    @Override
    public int hashCode() { return type.hashCode() ^ scope.hashCode(); }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Descriptor)) return false;
        Descriptor pairo = (Descriptor) o;
        return this.type.equals(pairo.getType()) &&
                this.scope.equals(pairo.getScope());
    }

}