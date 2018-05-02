import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;


public class SymbolTable{

	private SymbolTableVisitor symbolTableVisitor = new SymbolTableVisitor(this);
	private SemanticVisitor semanticVisitor = new SemanticVisitor(this);

	private String name;
	private boolean isFunction = false;
	private boolean isConditional = false;

    private HashMap<String, Element> elements = new HashMap<String, Element>();
	private HashMap<String, Element> parameters = null;
	private Element returnValue = null;
	private SymbolTable parent = null;


	private LinkedList<SymbolTable> children = new LinkedList<SymbolTable>();

	public SymbolTable(){ }
	public SymbolTable(String name, boolean isConditional){
		this.name = name;
		this.isConditional = isConditional;
	}


	public SymbolTable(String name, Element returnValue, LinkedList<Element> elements){
		this.name = name;
		this.isFunction = true;
		this.isConditional = false;
		this.returnValue = returnValue;
		this.parameters = new HashMap<String, Element>();
		addParameters(elements);
	}

	public void addElement(Element element){
		elements.put(element.getName(), element);
	}

	private void addParameters(LinkedList<Element> elements){
		for(Element element : elements)
			parameters.put(element.getName(), element);
	}

	public void addChild(SymbolTable symbolTable){
		symbolTable.setParent(this);
		children.addFirst(symbolTable);
	}

	public SymbolTable popChild(){
		SymbolTable symbolTable = children.pop();
		children.addLast(symbolTable);
		return symbolTable;
	}


	public LinkedList<Element> getElements(){
		return new LinkedList<Element>(elements.values());
	}


	public Element getElement(String name){
		if(returnValue != null)
			if(returnValue.equals(name))
				return returnValue;
		if(elements.containsKey(name)){
			return elements.get(name);
		}
		if(isFunction)
			if(parameters.containsKey(name))
				return parameters.get(name);

		if(parent == null)
			return null;
		return parent.getElement(name);
	}

	public SymbolTableVisitor getSymbolTableVisitor() {
		return symbolTableVisitor;
	}
	public SemanticVisitor getSemanticVisitor() {
		return semanticVisitor;
	}

	public void setParent(SymbolTable symbolTable){
		this.parent = symbolTable;
	}

	public void setName(String name) {
		this.name = name;
	}


	private String MapToString(String name, HashMap<String, Element> map){
        StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append(name + ":\n");

        for(Map.Entry<String, Element> entry : map.entrySet()){
            String identifier = entry.getKey();
            Element element = entry.getValue();

			stringBuilder.append("\t" + identifier + " -> " + element + "\n");
        }

        return stringBuilder.toString();
    }

    @Override
    public String toString() {

        StringBuilder stringBuilder = new StringBuilder();
        if(name != null){

			if(!isConditional){
				stringBuilder.append((isFunction)? "Function: " : "MODULE: ");
			}
			stringBuilder.append(name);
        }

        if(isFunction){
			stringBuilder.append("\tReturn: ");
			stringBuilder.append((returnValue==null)? "void" : returnValue.toString());
			stringBuilder.append("\n");
			stringBuilder.append(MapToString("Parameters", parameters));
        }else
			stringBuilder.append("\n");

		stringBuilder.append(MapToString("Locals", elements));
		stringBuilder.append("\n.............................................................................................................\n\n");

        for(SymbolTable s : children){
			stringBuilder.append(s.toString());
        }
        return stringBuilder.toString();
    }



}