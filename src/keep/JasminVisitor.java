
import java.util.LinkedList;

public class JasminVisitor implements ParserVisitor {

    private JasminGenerator jasminGenerator;
    private Type storeType = Type.UNDEFINED;

    public JasminVisitor(JasminGenerator jasminGenerator) {
        this.jasminGenerator = jasminGenerator;
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

        LinkedList<Element> elements = this.jasminGenerator.getRootSymbolTable().getElements();

        int fields = this.jasminGenerator.writeFields(elements);

        if( fields > 0)
        {
            this.jasminGenerator.writeInitMethod();
        }
        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, data);
            if (i == fields-1) {
                this.jasminGenerator.writeEndMethod();
            }
        }

        return null;
    }

    public Object visit(ASTDeclaration node, Object data) {
        Element leftNode = (Element) node.jjtGetChild(0).jjtAccept(this, true);
        if(leftNode.getType() != Type.ARRAY)
            return null;
        node.jjtGetChild(1).jjtAccept(this, false);
        this.jasminGenerator.writePutstatic(leftNode);
        return null;
    }

    public Object visit(ASTScalarDeclaration node, Object data) {
        return null;
    }

    public Object visit(ASTSign node, Object data) {

        return (String)node.jjtGetValue();
    }

    public Object visit(ASTScalar node, Object data) {
        this.jasminGenerator.writeSingleWord((String)node.jjtGetValue());
        return "I";
    }

    public Object visit(ASTArrayDeclaration node, Object data) {
        node.jjtGetChild(0).jjtAccept(this,false);
        this.jasminGenerator.writeArray();
        return null;
    }

    public Object visit(ASTFunction node, Object data) {
        SymbolTable currentSymbolTable = this.jasminGenerator.getCurrentSymbolTable();
        this.jasminGenerator.pushFront(currentSymbolTable.popChild());
        this.jasminGenerator.writeBeginMethod(this.jasminGenerator.getCurrentSymbolTable());
        this.jasminGenerator.writeStackAndLocals(20, this.jasminGenerator.getCurrentSymbolTable().getLocals());
        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, data);
        }
        this.jasminGenerator.writeEndMethod(this.jasminGenerator.getCurrentSymbolTable().getReturnValue());
        this.jasminGenerator.popFront();
        return null;
    }

    public Object visit(ASTReturn node, Object data) {
        return null;
    }

    public Object visit(ASTParameters node, Object data) {
        return null;
    }

    public Object visit(ASTVariable node, Object data) {
        Element element = this.jasminGenerator.getCurrentSymbolTable().getElement((String)node.value);

        if((boolean) data)
            return element;

        this.jasminGenerator.writeLoadElement(element);
        return element.getJasminType();
    }

    public Object visit(ASTArrayElement node, Object data) {
        return null;
    }

    public Object visit(ASTStatements node, Object data) {
        for (int i = 0; i < node.jjtGetNumChildren(); i++) {
            node.jjtGetChild(i).jjtAccept(this, true);
        }
        return null;
    }

    public Object visit(ASTAssign node, Object data) {
        storeType = Type.UNDEFINED;
        Element element = (Element) node.jjtGetChild(0).jjtAccept(this, true);
        node.jjtGetChild(1).jjtAccept(this, false);
        this.jasminGenerator.writeStoreElement(element, storeType == Type.INTEGER);
        storeType = Type.UNDEFINED;

        return null;
    }

    public Object visit(ASTOperation node, Object data) {
        node.jjtGetChild(0).jjtAccept(this, false);
        node.jjtGetChild(1).jjtAccept(this, false);

        this.jasminGenerator.writeSign((String) node.value);

        return null;
    }

    public Object visit(ASTAccess node, Object data) {
        SymbolTable currentSymbolTable = this.jasminGenerator.getCurrentSymbolTable();
        Element element = currentSymbolTable.getElement((String) node.value);

        if((boolean) data){
            if(element.getType() == Type.ARRAY){
                if(node.jjtGetNumChildren() == 0){
                    storeType = Type.ARRAY;
                }
                else{
                    this.jasminGenerator.writeLoadElement(element);
                    node.jjtGetChild(0).jjtAccept(this,false);
                    storeType = Type.INTEGER;
                }
            }
            else {
                storeType = Type.INTEGER;
            }
            return element;
        }

        this.jasminGenerator.writeLoadElement(element);

        if(element.getType() != Type.ARRAY)
            return null;

        Object object = node.jjtGetChild(0).jjtAccept(this, false);
        if(object!= null){
            if(object instanceof Boolean){
                if(!(Boolean)object)
                    return null;
            }
        }

        this.jasminGenerator.writeIaload();

        return null;
    }

    public Object visit(ASTTerm node, Object data) {

        if(node.jjtGetNumChildren() == 2){
            String sign = (String)node.jjtGetChild(0).jjtAccept(this, true);
            node.jjtGetChild(1).jjtAccept(this, false);
            if(sign.equals("-")){
                this.jasminGenerator.writeIneg();
            }
        }
        else{
            node.jjtGetChild(0).jjtAccept(this, false);
        }
        return null;
    }


    public Object visit(ASTCall node, Object data) {
        SymbolTable rootSymbolTable = this.jasminGenerator.getRootSymbolTable();

        String types = (String)node.jjtGetChild(node.jjtGetNumChildren()-1).jjtAccept(this,false);
        String moduleName = (String)node.value;
        boolean pop = false;
        if(node.jjtGetNumChildren()==1){
            Element element = rootSymbolTable.getElement(moduleName);
            this.jasminGenerator.writeInvokeStatic(element);
            pop=element.getReturn().getName() != null;
        }
        else{
            String methodName = (String)node.jjtGetChild(0).jjtAccept(this,false);
            String returnValue;
            if(storeType == Type.ARRAY){
                returnValue = "[I";
            }
            else if(storeType == Type.INTEGER){
                returnValue = "I";
            }
            else
                returnValue = "V";
            this.jasminGenerator.writeInvokeStatic(moduleName, methodName, types, returnValue);
        }
        if(pop && (boolean)data){
            this.jasminGenerator.writePop();
        }
        return null;
    }

    public Object visit(ASTFunctionName node, Object data) {
        return node.value;
    }

    public Object visit(ASTSize node, Object data) {
        this.jasminGenerator.writeArraySize();

        return Boolean.FALSE;
    }

    public Object visit(ASTConditionalOperation node, Object data) {
        ASTAccess leftNode = (ASTAccess)node.jjtGetChild(0);
        leftNode.jjtAccept(this,false);
        SimpleNode rightNode = (SimpleNode)node.jjtGetChild(1);
        rightNode.jjtAccept(this,false);

        return null;
    }

    public Object visit(ASTWhile node, Object data) {

        ASTConditionalOperation conditionNode = (ASTConditionalOperation) node.jjtGetChild(0);
        ASTStatements statementNode = (ASTStatements) node.jjtGetChild(1);

        this.jasminGenerator.writeWhile(conditionNode, statementNode, this);

        return null;
    }

    public Object visit(ASTIf node, Object data) {


        ASTConditionalOperation conditionNode = (ASTConditionalOperation)node.jjtGetChild(0);
        ASTStatements ifNode = (ASTStatements)node.jjtGetChild(1);
        ASTStatements elseNode = null;
        if(node.jjtGetNumChildren() > 2){
            elseNode = (ASTStatements)node.jjtGetChild(2);
        }

        this.jasminGenerator.writeIf(conditionNode, ifNode, elseNode, this);

        return null;
    }

    public Object visit(ASTArgumentList node, Object data) {
        StringBuilder stringBuilder = new StringBuilder();
        for(int i =0; i < node.jjtGetNumChildren(); i++){
            stringBuilder.append(node.jjtGetChild(i).jjtAccept(this,false));
        }
        return stringBuilder.toString();
        }

    public Object visit(ASTString node, Object data) {
        this.jasminGenerator.writeSingleWord((String)node.value);
        return "Ljava/lang/String;";
    }
}