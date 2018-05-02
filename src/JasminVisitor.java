import java.util.LinkedList;

public class JasminVisitor implements ParserVisitor {

    private SymbolTableContextManager symbolTableContextManager;
    private JasminGenerator jasminGenerator;

    public JasminVisitor(JasminGenerator jasminGenerator){
        this.jasminGenerator = jasminGenerator;
        this.symbolTableContextManager = new SymbolTableContextManager(jasminGenerator.getSymbolTable());
    }

    public Object visit(SimpleNode node, Object data){return null;}
    public Object visit(ASTerror_skipto node, Object data){return null;}
    public Object visit(ASTerror_skipto_andEat node, Object data){return null;}
    public Object visit(ASTStart node, Object data){
        node.jjtGetChild(0).jjtAccept(this,null);
        return null;
    }
    public Object visit(ASTModule node, Object data){
        String moduleName = (String)node.jjtGetValue();

        this.jasminGenerator.writeModule(moduleName);

        LinkedList<Element> elements = this.symbolTableContextManager.getRootSymbolTable().getElements();

        this.jasminGenerator.writeFields(elements);

        return null;
    }
    public Object visit(ASTDeclaration node, Object data){

        return null;
    }
    public Object visit(ASTScalarDeclaration node, Object data){return null;}
    public Object visit(ASTSign node, Object data){return null;}
    public Object visit(ASTScalar node, Object data){return null;}
    public Object visit(ASTArrayDeclaration node, Object data){return null;}
    public Object visit(ASTFunction node, Object data){return null;}
    public Object visit(ASTReturn node, Object data){return null;}
    public Object visit(ASTParameters node, Object data){return null;}
    public Object visit(ASTVariable node, Object data){return null;}
    public Object visit(ASTArrayElement node, Object data){return null;}
    public Object visit(ASTStatements node, Object data){return null;}
    public Object visit(ASTAssign node, Object data){return null;}
    public Object visit(ASTOperation node, Object data){return null;}
    public Object visit(ASTAccess node, Object data){return null;}
    public Object visit(ASTTerm node, Object data){return null;}
    public Object visit(ASTCall node, Object data){return null;}
    public Object visit(ASTFunctionName node, Object data){return null;}
    public Object visit(ASTSize node, Object data){return null;}
    public Object visit(ASTConditionalOperation node, Object data){return null;}
    public Object visit(ASTWhile node, Object data){return null;}
    public Object visit(ASTIf node, Object data){return null;}
    public Object visit(ASTArgumentList node, Object data){return null;}
    public Object visit(ASTString node, Object data){return null;}
}