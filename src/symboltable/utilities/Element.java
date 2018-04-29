package src.symboltable.utilities;

public class Element {

    private String name;
    private Descriptor descriptor;
    private boolean initialized = false;

    public Element(String name, Type type, String scope) {
        this.name = name;
        this.descriptor = new Descriptor(type, scope);
    }

    public Element(String name, Type type, String scope, boolean initialized) {
        this.name = name;
        this.descriptor = new Descriptor(type, scope);
        this.initialized = initialized;
    }

    public String getName() { return name; }
    public Descriptor getDescriptor() {return  descriptor; }
    public Type getType() { return descriptor.getType(); }
    public String getTypeStr() { return descriptor.getTypeStr(); }
    public String getScope() { return descriptor.getScope(); }
    public boolean isInitialized() { return initialized; }

    @Override
    public int hashCode() { return name.hashCode() ^ descriptor.hashCode();}

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Element)) return false;
        Element pairo = (Element) o;
        return this.name.equals(pairo.getName()) && this.descriptor.equals(pairo.getDescriptor());
    }

}