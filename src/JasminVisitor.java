import java.util.LinkedList;

public class JasminVisitor implements ParserVisitor {

    private SymbolTableContextManager symbolTableContextManager;
    private JasminGenerator jasminGenerator;

    public JasminVisitor(JasminGenerator jasminGenerator, SymbolTable symbolTable) {
        this.jasminGenerator = jasminGenerator;
        this.symbolTableContextManager = new SymbolTableContextManager(symbolTable);
    }

    public Object visit(SimpleNode node, Object data) {
        return null;
    }

    public Object visit(ASTerror_skipto node, Object data) {
        return null;
    }

    public Object visit(ASTerror_skipto_andEat node, Object data) {
        return null;
    }

    public Object visit(ASTStart node, Object data) {
        node.jjtGetChild(0).jjtAccept(this, null);
        return null;
    }

    public Object visit(ASTModule node, Object data) {
        String moduleName = (String) node.jjtGetValue();

        this.jasminGenerator.writeModule(moduleName);

        LinkedList<Element> elements = this.symbolTableContextManager.getRootSymbolTable().getElements();

        int fields = this.jasminGenerator.writeFields(elements);

        if (fields > 0) {
            this.jasminGenerator.writeInitMethod();
        }

        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, data);
            if (i == fields - 1) {
                this.jasminGenerator.writeEndMethod();
            }
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
        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, data);
        }
        return null;
    }

    public Object visit(ASTReturn node, Object data) {
        return null;
    }

    public Object visit(ASTParameters node, Object data) {
        return null;
    }

    public Object visit(ASTVariable node, Object data) {
        return null;
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
        return null;
    }

    public Object visit(ASTOperation node, Object data) {
        return null;
    }

    public Object visit(ASTAccess node, Object data) {
        return null;
    }

    public Object visit(ASTTerm node, Object data) {
        return null;
    }

    public Object visit(ASTCall node, Object data) {
        return null;
    }

    public Object visit(ASTFunctionName node, Object data) {
        return null;
    }

    public Object visit(ASTSize node, Object data) {
        return null;
    }

    public Object visit(ASTConditionalOperation node, Object data) {
        return null;
    }

    public Object visit(ASTWhile node, Object data) {

        ASTConditionalOperation conditionNode = (ASTConditionalOperation)node.jjtGetChild(0);
        ASTStatements statementNode = (ASTStatements)node.jjtGetChild(1);

        this.jasminGenerator.writeWhile(conditionNode, statementNode, this);

        return null;
    }

    public Object visit(ASTIf node, Object data) {
        return null;
    }

    public Object visit(ASTArgumentList node, Object data) {
        return null;
    }

    public Object visit(ASTString node, Object data) {
        return null;
    }
}