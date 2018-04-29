package src.symboltable.utilities;

import java.util.LinkedList;

public class Function extends Element {
    private LinkedList<Element> arguments = new LinkedList<Element>();
    private Element returnValue;
    public Function(String name, Type type, String scope) {
        super(name, type, scope);
    }

    public Function(String name, Type type, String scope, boolean initialized) {
        super(name, type, scope, initialized);
    }

    public LinkedList<Element> getArguments() {
        return arguments;
    }

    public void addArguments(LinkedList<Element> arguments) {
        this.arguments.addAll(arguments);
    }

    public void addArgument(Element argument) {
        this.arguments.add(argument);
    }

    public Element getReturnValue() {
        return returnValue;
    }

    public void setReturnValue(Element returnValue) {
        this.returnValue = returnValue;
    }
}
