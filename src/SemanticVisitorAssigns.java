
import java.util.LinkedList;

public class SemanticVisitorAssigns implements ParserVisitor {

    SymbolTableContextManager symbolTableContextManager;

    public SemanticVisitorAssigns(SymbolTableContextManager symbolTableContextManager) {
        this.symbolTableContextManager = symbolTableContextManager;

    }

    public Object visit(ASTerror_skipto node, Object data) {
        return null;
    }

    public Object visit(ASTerror_skipto_andEat node, Object data) {
        return null;
    }

    public Object visit(SimpleNode node, Object data) {
        return null;
    }

    public Object visit(ASTStart node, Object data) {

        node.jjtGetChild(0).jjtAccept(this, data);

        return null;
    }

    public Object visit(ASTModule node, Object data) {

        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, data);
        }

        return null;
    }

    public Object visit(ASTDeclaration node, Object data) {
        return null;
    }

    public Object visit(ASTScalarDeclaration node, Object data) {
        return null;
    }

    public Object visit(ASTSign node, Object data) {
        return null;
    }

    public Object visit(ASTScalar node, Object data) {
        return new Element("", Type.INTEGER);    }

    public Object visit(ASTArrayDeclaration node, Object data) {
        return new Element("", Type.ARRAY);    }

    public Object visit(ASTFunction node, Object data) {
        SymbolTable currenSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();
        this.symbolTableContextManager.pushFront(currenSymbolTable.popChild());

        node.jjtGetChild(2).jjtAccept(this, data);

        this.symbolTableContextManager.popFront();

        return null;

    }

    public Object visit(ASTReturn node, Object data) {
        return null;
    }

    public Object visit(ASTParameters node, Object data) {
        return null;
    }

    public Object visit(ASTVariable node, Object data) {

        if(node.jjtGetNumChildren() == 1){
            SemanticManager.addError(node.line, "Invalid Operation. Cannot declare an array while accessing another");
        }

        return new Element("", Type.INTEGER);
    }

    public Object visit(ASTArrayElement node, Object data) {
        return new Element("", Type.ARRAY);
    }

    public Object visit(ASTStatements node, Object data) {

        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, data);
        }

        return null;
    }

    public Object visit(ASTAssign node, Object data) {

        Element leftElement = (Element)node.jjtGetChild(0).jjtAccept(this, data);

        Element rightElement = (Element)node.jjtGetChild(1).jjtAccept(this, data);

        if (leftElement == null) {
            SemanticManager.addError(node.line,
                    "Error: Left Side Variable is undefined!");
            return null;
        }

        if(rightElement == null){
            SemanticManager.addError(node.line,
                    "Error: Right Side Variable is undefined!");
            return null;
        }



        if(leftElement.getType() == Type.UNDEFINED){
            return null;
        }

        if(leftElement.getName().equals("read_only")){
            SemanticManager.addError(node.line, "Invalid Operation. Cannot assign a length of an array");
        }


        if(rightElement.getType() == Type.UNDEFINED){
            return null;
        }

        if(leftElement.getType() != rightElement.getType()){
            SemanticManager.addError(node.line,"Cannot assign a variable with different type");
        }

        return null;

    }

    public Object visit(ASTOperation node, Object data) {

        Element element1 = (Element)node.jjtGetChild(0).jjtAccept(this, data);
        Element element2 = (Element)node.jjtGetChild(1).jjtAccept(this, data);

        if(element1.getType() == Type.INTEGER && element2.getType() == Type.INTEGER){
            return new Element("", Type.INTEGER);
        }else if(element1.getType() == Type.ARRAY || element2.getType() == Type.ARRAY){
            SemanticManager.addError(node.line, "Invalid operations with different arrays");
        }
        return new Element("", Type.UNDEFINED);
    }

    public Object visit(ASTAccess node, Object data) {
        if(node.jjtGetNumChildren() == 0){
            return this.symbolTableContextManager.getCurrentSymbolTable().getElement((String)node.jjtGetValue());
        }else{

            return node.jjtGetChild(0).jjtAccept(this, data);
        }
    }

    public Object visit(ASTTerm node, Object data) {

        return (Element)node.jjtGetChild(node.jjtGetNumChildren()-1).jjtAccept(this, data);
    }

    public Object visit(ASTFunctionName node, Object data) {
        return null;
    }

    public Object visit(ASTSize node, Object data) {
        return new Element("read_only", Type.INTEGER);
    }

    public Object visit(ASTConditionalOperation node, Object data) {

        return null;
    }

    public Object visit(ASTWhile node, Object data) {

        SymbolTable currenSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();

        node.jjtGetChild(0).jjtAccept(this, data);

        this.symbolTableContextManager.pushFront(currenSymbolTable.popChild());

        node.jjtGetChild(1).jjtAccept(this, data);

        this.symbolTableContextManager.popFront();

        return null;
    }

    public Object visit(ASTIf node, Object data) {


        SymbolTable currenSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();
        node.jjtGetChild(0).jjtAccept(this, data);

        this.symbolTableContextManager.pushFront(currenSymbolTable.popChild());

        node.jjtGetChild(1).jjtAccept(this, data);

        this.symbolTableContextManager.popFront();

        if(node.jjtGetNumChildren() == 3){

            this.symbolTableContextManager.pushFront(currenSymbolTable.popChild());

            node.jjtGetChild(2).jjtAccept(this, data);

            this.symbolTableContextManager.popFront();
        }
        return null;
    }

    public Object visit(ASTCall node, Object data) {

        if (node.jjtGetNumChildren() == 1) {

            Element function = this.symbolTableContextManager.getRootSymbolTable().getElement((String) node.jjtGetValue());
            return function.getReturn();

        }

        return new Element("", Type.UNDEFINED);
    }

    public Object visit(ASTArgumentList node, Object data) {

        return null;
    }

    public Object visit(ASTString node, Object data) {
        return null;
    }
}
