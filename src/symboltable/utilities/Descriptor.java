package src.symboltable.utilities;


public class Descriptor {

    private Type type;
    private String scope;

    public Descriptor(Type type, String scope) {
        this.type = type;
        this.scope = scope;
    }


    Type getType() { return type; }
    String getTypeStr() { return Type.getTypeStr(type); }
    String getScope() { return scope; }


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