import java.util.LinkedList;


public class SymbolTableVisitor implements ParserVisitor {

	SymbolTableContextManager symbolTableContextManager;

	public SymbolTableVisitor(SymbolTable symbolTable){
		this.symbolTableContextManager = new SymbolTableContextManager(symbolTable);
	}

	public Object visit(ASTerror_skipto node, Object data){return null;}
	
	public Object visit(ASTerror_skipto_andEat node, Object data){return null;}

	public Object visit(SimpleNode node, Object data) {
		return null;
	}

	public Object visit(ASTStart node, Object data) {

		node.jjtGetChild(0).jjtAccept(this, data);

		return null;
	}

	public Object visit(ASTModule node, Object data) {

		String module = (String)node.jjtGetValue();
		this.symbolTableContextManager.getCurrentSymbolTable().setName(module);
		for(int i = 0; i < node.jjtGetNumChildren(); i++){
			node.jjtGetChild(i).jjtAccept(this, data);
		}
		return null;
	}

	public Object visit(ASTDeclaration node, Object data) {
		SymbolTable currentSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();

		boolean initialized = false;
        Type variableType = Type.UNDEFINED;

		Element leftType = (Element)node.jjtGetChild(0).jjtAccept(this, data);
		Element rightType = null;
		if(node.jjtGetNumChildren() == 2){

			rightType = (Element)node.jjtGetChild(1).jjtAccept(this, data);

			if(rightType.getType() == Type.INTEGER && leftType.getType() == Type.INTEGER){
				initialized = true;
				variableType = rightType.getType();

			}else if(rightType.isInitialized()){

				if(rightType.getType() == Type.ARRAY){
					initialized = true;
					variableType = Type.ARRAY;
				}else{
					SemanticManager.addError(node.line,
					"Error Assigning Variable " + leftType.getName() + " -> Type array is incompatible with Type int!");
				}
			}else{
				SemanticManager.addError(node.line,
						"Error Assigning Variable " + rightType.getName() + " -> Was not initialized!");
				SemanticManager.addError(node.line,
						"Error Assigning Variable " + leftType.getName() + " -> Cannot assign a variable to Undefined!");
			}
		}else{
			variableType = leftType.getType();
		}

		Element element = null;

		element = new Element(leftType.getName(), variableType);
		element.setInitialized(initialized);

		currentSymbolTable.addElement(element);

		return null;
	}

	public Object visit(ASTScalarDeclaration node, Object data) {
		return new Element("", Type.INTEGER);
	}

	public Object visit(ASTSign node, Object data) {
		return null;
	}

	public Object visit(ASTScalar node, Object data) {
		return new Element("", Type.INTEGER, true);
	}

	public Object visit(ASTArrayDeclaration node, Object data){

		Element element = (Element)node.jjtGetChild(0).jjtAccept(this, true);

		if(element == null){
			return new Element(element.getName(), Type.ARRAY, false);
		}

		return new Element(element.getName(), Type.ARRAY, element.isInitialized());
	}

	public Object visit(ASTFunction node, Object data){

		LinkedList<Element> parameters = (LinkedList<Element>)node.jjtGetChild(1).jjtAccept(this, data);
		Element returnVal = (Element)node.jjtGetChild(0).jjtAccept(this, data);
		String functName = (String)node.jjtGetValue();

		Element funct = new Element(functName, true, returnVal, parameters);
		SymbolTable currentST = this.symbolTableContextManager.getCurrentSymbolTable();

		currentST.addElement(funct);
		currentST.addChild(new SymbolTable(functName, returnVal, parameters));

		this.symbolTableContextManager.pushFront(currentST.popChild());
		node.jjtGetChild(2).jjtAccept(this, data);


		if(!returnVal.isInitialized() && returnVal.getType() != Type.UNDEFINED){
			SemanticManager.addError(node.line, "Error: Function " + functName + " must return a value!");
		}

		this.symbolTableContextManager.popFront();
		return null;
	}

	public Object visit(ASTReturn node, Object data){

		String nodeName = (String) node.value;

		if(node.jjtGetNumChildren() == 1){
			return new Element(nodeName, Type.ARRAY);
		}

		else{
			if(nodeName == null){
				return new Element(nodeName, Type.UNDEFINED);
			}
			else{
				return new Element(nodeName, Type.INTEGER);
			}
		}
	}

	public Object visit(ASTParameters node, Object data){

		LinkedList<Element> elements = new LinkedList<Element>();

		for(int i = 0; i < node.jjtGetNumChildren(); i++){

			Element element  = (Element)node.jjtGetChild(i).jjtAccept(this, data);
			element.setInitialized(true);

			elements.add(element);
		}
		return elements;
	}

	public Object visit(ASTVariable node, Object data){

		if(node.jjtGetNumChildren() > 0)
			return new Element((String)node.jjtGetValue(), Type.ARRAY);

		return new Element((String)node.jjtGetValue(), Type.INTEGER);
	}

	public Object visit(ASTArrayElement node, Object data){
		return null;
	}

	public Object visit(ASTStatements node, Object data){
		for(int i = 0; i < node.jjtGetNumChildren(); i++){
			node.jjtGetChild(i).jjtAccept(this, data);
		}
		return null;
	}

	public Object visit(ASTAssign node, Object data){

		Element element1 = (Element)node.jjtGetChild(0).jjtAccept(this, data);

		if(element1 == null){
			SemanticManager.addError(node.line,
					"Error: Left Side Variable is undefined!");
			return null;
		}

		Element element2 = (Element)node.jjtGetChild(1).jjtAccept(this, data);

		if(element1.getType() == Type.UNDEFINED){
			element1.setType(element2.getType());
			this.symbolTableContextManager.getCurrentSymbolTable().addElement(element1);

		}else if(element1.getType() == Type.FUNCTION){

			element1 = new Element(element1.getName(), element2.getType());
		}

		if(element2 == null){
			SemanticManager.addError(node.line,
					"Error: Cannot Assign a variable to undefined!");
			return null;
		}

		if(!element2.isInitialized()){
			SemanticManager.addError(node.line,
					"Error variable: "+ element1.getName() + " -> Cannot Assign a variable to undefined!");

		}else if(element1.getType() == Type.UNDEFINED || element2.getType() == Type.UNDEFINED){

			if(element1.getType() == Type.UNDEFINED){
				element1.setType(element2.getType());
			}

			element1.setInitialized(element2.isInitialized());

		}else if(element1.getType() == element2.getType()){
			element1.setInitialized(element2.isInitialized());
		}else{
			SemanticManager.addError(node.line,
					"Error: Right side variable of type " + Type.getTypeStr(element1.getType()) + " is incompatible with type " + Type.getTypeStr(element2.getType()));
		}

		return null;
	}

	public Object visit(ASTOperation node, Object data){

		Element leftElement = (Element)node.jjtGetChild(0).jjtAccept(this, data);
		Element rightElement = (Element)node.jjtGetChild(1).jjtAccept(this, data);

		if(!leftElement.isInitialized()){

			if(this.symbolTableContextManager.getCurrentSymbolTable().getElement(leftElement.getName()) == null){
				SemanticManager.addError(node.line,
						"Error: Left side variable: " + leftElement.getName() + " is undefined!");

			}else{
				SemanticManager.addError(node.line,
						"Error: Left side variable: " + leftElement.getName() + " is not initialized!");
			}
		}

		if(!rightElement.isInitialized()){

			if(this.symbolTableContextManager.getCurrentSymbolTable().getElement(rightElement.getName()) == null){
				SemanticManager.addError(node.line,
						"Error: Right side variable: " + rightElement.getName() + " is undefined");

			}else{
				SemanticManager.addError(node.line,
						"Error: Right side var:" + rightElement.getName() + " is not initialized!");
			}
		}


		if(leftElement.getType() == Type.UNDEFINED || rightElement.getType() == Type.UNDEFINED){
			return new Element("", Type.UNDEFINED, true);
		}

		if(leftElement.getType() == rightElement.getType())
			return new Element("", leftElement.getType(), true);

		if(leftElement.getType() != Type.UNDEFINED && rightElement.getType() != Type.UNDEFINED){

			SemanticManager.addError(node.line,
					"Error: Right side variable of type " + Type.getTypeStr(rightElement.getType()) + " is incompatible with type left side variable of type " + Type.getTypeStr(leftElement.getType()));
		}

		return new Element("", Type.UNDEFINED);
	}

	public Object visit(ASTAccess node, Object data){
		SymbolTable currentSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();
		Element element = currentSymbolTable.getElement((String)node.jjtGetValue());

		if(element == null){
			return new Element((String)node.jjtGetValue(), Type.UNDEFINED);
		}

		if(node.jjtGetNumChildren() == 1 && element.getType() != Type.ARRAY){
			SemanticManager.addError(node.line,
					"Error: variable " + node.jjtGetValue() + " isn't an array!");

			return null;

		}else if(node.jjtGetNumChildren()== 1){

			 Element child = (Element)node.jjtGetChild(0).jjtAccept(this, null);

			 if(!child.isInitialized()){
				 Element childSymbolTable = currentSymbolTable.getElement(child.getName());
				 if(childSymbolTable == null){
						SemanticManager.addError(node.line,
								"Error: variable " + child.getName() + " is not declared!");
						return null;

				 }else if(!childSymbolTable.isInitialized()){
						SemanticManager.addError(node.line,
								"Error: variable " + child.getName() + " is not initialized!");
						return null;
				 }
				 return childSymbolTable;
			 }
			 return child;
		}
		return element;
	}

	public Object visit(ASTTerm node, Object data){

		return (Element)node.jjtGetChild(node.jjtGetNumChildren()-1).jjtAccept(this, data);

	}

	public Object visit(ASTFunctionName node, Object data){
		return null;
	}

	public Object visit(ASTSize node, Object data){
		return new Element("", Type.INTEGER, true);
	}

	public Object visit(ASTConditionalOperation node, Object data){

		Element leftElement  = (Element)node.jjtGetChild(0).jjtAccept(this, true);

		if(leftElement == null){
			SemanticManager.addError(node.line,
					"Error: Left side variable is undefined!");
			return null;

		}else if(!leftElement.isInitialized()){
			SemanticManager.addError(node.line,
					"Error: Left side variable " + leftElement.getName() + " isn't initialized!");
		}


		Element rightElement = (Element)node.jjtGetChild(1).jjtAccept(this, true);

		if(rightElement == null){
			SemanticManager.addError(node.line,
					"Error: Right side variable is undefined!");
			return null;
		}

		if(!rightElement.isInitialized()){
			SemanticManager.addError(node.line,
					"Error: Right side variable " + rightElement.getName() + " isn't initialized!");

		}else if(rightElement.getType() != Type.UNDEFINED){
			if(leftElement.getType() != rightElement.getType()){
				SemanticManager.addError(node.line,
						"Error: Right side variable of type" + Type.getTypeStr(rightElement.getType()) + " is incompatible with left side variable of type " + Type.getTypeStr(leftElement.getType()));
			}
		}

		return null;
	}

	public Object visit(ASTWhile node, Object data){

		SymbolTable currenSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();

		node.jjtGetChild(0).jjtAccept(this, data);

		currenSymbolTable.addChild(new SymbolTable("While", true));
		this.symbolTableContextManager.pushFront(currenSymbolTable.popChild());

		node.jjtGetChild(1).jjtAccept(this, data);

		this.symbolTableContextManager.popFront();

		return null;
	}

	public Object visit(ASTIf node, Object data){

		SymbolTable currentSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();

		node.jjtGetChild(0).jjtAccept(this, data);

		currentSymbolTable.addChild(new SymbolTable("If", true));
		this.symbolTableContextManager.pushFront(currentSymbolTable.popChild());

		node.jjtGetChild(1).jjtAccept(this, data);

		if(node.jjtGetNumChildren() == 3)
			node.jjtGetChild(2).jjtAccept(this, data);

		this.symbolTableContextManager.popFront();

		return null;
	}

	public Object visit(ASTCall node, Object data){
		return new Element("",Type.UNDEFINED, true);
	}

	public Object visit(ASTArgumentList node, Object data){
		return null;
	}

	public Object visit(ASTString node, Object data){
		return null;
	}

}
