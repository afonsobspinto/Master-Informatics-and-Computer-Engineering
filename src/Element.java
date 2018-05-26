import java.util.LinkedList;

public class Element {

    private String name;
    private Type type;
    Object value;
    private boolean isInitialized = false;

    private LinkedList<Element> arguments = null;
    private Element returnValue;
    private int jasminLine = -1;

    public Element(String name, Type type) {
        this.name = name;
        this.type = type;
        if (type == Type.FUNCTION)
            arguments = new LinkedList<Element>();
    }


    public Element(String name, Type type, boolean isInitialized) {
        this.name = name;
        this.type = type;
        if (type == Type.FUNCTION)
            arguments = new LinkedList<Element>();
        this.isInitialized = isInitialized;
    }

    public Element(String name, Type type, boolean isInitialized, Object value) {
        this.name = name;
        this.type = type;
        if (type == Type.FUNCTION)
            arguments = new LinkedList<Element>();
        this.isInitialized = isInitialized;
        this.value = value;
    }

    public Element(String name, boolean isInitialized, Element returnValue, LinkedList<Element> arguments) {
        this.name = name;
        this.type = Type.FUNCTION;
        this.isInitialized = isInitialized;
        this.returnValue = returnValue;
        this.arguments = arguments;
    }


    public String getName() {
        return name;
    }

    public Type getType() {
        return type;
    }

    public String getTypeStr() {
        return Type.getTypeStr(type);
    }

    public boolean isInitialized() {
        return isInitialized;
    }

    public String getJasminType() {
        if (type == Type.ARRAY) {
            return "[I";
        }

        if (type == Type.INTEGER)
            return "I";

        return "Unknown";
    }

    public Object getValue() {
        return value;
    }

    public int getJasminLine() {
        return jasminLine;
    }

    public void setJasminLine(int jasminLine) {
        this.jasminLine = jasminLine;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public Element getReturn() {
        return returnValue;
    }

    public void setReturn(Element e) {
        returnValue = e;
    }

    public void addArgument(Element e) {
        arguments.add(e);
    }

    public void addArguments(LinkedList<Element> e) {
        arguments.addAll(e);
    }

    public LinkedList<Element> getArguments() {
        return arguments;
    }

    public void setInitialized(boolean v) {
        isInitialized = v;
    }

    public void setType(Type type) {
        this.type = type;
    }

    @Override
    public String toString() {

        String string = "[" + name + ", " + getTypeStr() + ", ";
        string += (isInitialized ? "Initialized" : "Not Initialized") + ", ";
        string += ((value == null) ? "null" : (String) value) + "]";
        return string;

    }

    @Override
    public int hashCode() {
        return name.hashCode() ^ Type.getTypeStr(type).hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Element)) return false;
        Element pairo = (Element) o;
        return this.name.equals(pairo.getName()) && Type.getTypeStr(type).equals(pairo.getTypeStr());
    }


}
