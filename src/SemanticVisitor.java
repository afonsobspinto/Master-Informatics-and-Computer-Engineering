import java.util.LinkedList;

public class SemanticVisitor implements ParserVisitor {

    SymbolTableContextManager symbolTableContextManager;

    public SemanticVisitor(SymbolTable symbolTable) {
        this.symbolTableContextManager = new SymbolTableContextManager(symbolTable);

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
        return null;
    }

    public Object visit(ASTArrayDeclaration node, Object data) {
        return null;
    }

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

        return (Element) this.symbolTableContextManager.getCurrentSymbolTable().getElement((String) node.jjtGetValue());
    }

    public Object visit(ASTArrayElement node, Object data) {
        return null;
    }

    public Object visit(ASTStatements node, Object data) {

        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, data);
        }

        return null;
    }

    public Object visit(ASTAssign node, Object data) {

        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, data);
        }

        return null;
    }

    public Object visit(ASTOperation node, Object data) {

        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, data);
        }

        return null;
    }

    public Object visit(ASTAccess node, Object data) {
        return null;
    }

    public Object visit(ASTTerm node, Object data) {

        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, data);
        }

        return null;
    }

    public Object visit(ASTFunctionName node, Object data) {
        return null;
    }

    public Object visit(ASTSize node, Object data) {
        return null;
    }

    public Object visit(ASTConditionalOperation node, Object data) {

        node.jjtGetChild(1).jjtAccept(this, data);

        return null;
    }

    public Object visit(ASTWhile node, Object data) {

        node.jjtGetChild(0).jjtAccept(this, data);

        SymbolTable currenSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();
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

            if(function == null){
                SemanticManager.addError(node.line,
                        "Wrong function call : Function " + node.jjtGetValue() + " does not exist!");
                return null;
            }



            LinkedList<Element> args = function.getArguments();

            int aux = args.size();

            if(aux == 0 && node.jjtGetNumChildren() == 0)
                return null;

            if(node.jjtGetNumChildren() == 0){
                SemanticManager.addError(node.line,
                        "Function call on " + node.jjtGetValue() + " has illegal number of arguments! Should be " + args.size() + " argument(s).");
                return null;
            }

            if(aux == 0){
                SemanticManager.addError(node.line,
                        "Function call on " + node.jjtGetValue() + " has illegal number of arguments! This function does not accept any argument.");
                return null;
            }

            LinkedList<Element> parameters = (LinkedList<Element>) node.jjtGetChild(0).jjtAccept(this, data);

            if (parameters.size() != args.size()) {

                SemanticManager.addError(node.line, "Illegal number of arguments on " + node.jjtGetValue() + " Should be " + args.size() + " argument(s).");

                if (aux > parameters.size()) {
                    aux = parameters.size();
                }
            }

            for (int i = 0; i < aux; i++) {

                if(parameters.get(i) == null){
                    continue;
                }

                if (parameters.get(i).getType() != args.get(i).getType()) {
                    SemanticManager.addError(node.line,
                            "Argument " + parameters.get(i).getName()
                                    + " type error! Expected "
                                    + args.get(i).getTypeStr() + " but got " + parameters.get(i).getTypeStr() + " instead!");
                }
            }
        }

        return null;
    }

    public Object visit(ASTArgumentList node, Object data) {

        LinkedList<Element> vars = new LinkedList<Element>();

        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            vars.add((Element) node.jjtGetChild(i).jjtAccept(this, data));
        }

        return vars;
    }

    public Object visit(ASTString node, Object data) {
        return null;
    }
}
