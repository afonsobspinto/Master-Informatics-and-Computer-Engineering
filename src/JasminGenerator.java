
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.LinkedList;

public class JasminGenerator {


    private PrintWriter writer;

    private SymbolTableContextManager symbolTableContextManager;

    private JasminVisitor jasminVisitor;

    public JasminVisitor getJasminVisitor() {
        return jasminVisitor;
    }

    private String filepath;

    private Integer lineNumber = 1;

    private String moduleName;

    public String getFilepath() {
        return filepath;
    }

    public JasminGenerator(String fileName, SymbolTable symbolTable) {
        this.symbolTableContextManager = new SymbolTableContextManager(symbolTable);
        this.filepath = fileName.replace(".yal", "_generated.j");
        try {
            writer = new PrintWriter(this.filepath);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        this.jasminVisitor = new JasminVisitor(this);
    }

    public void close() {
        writer.close();
    }

    public void writeModule(String name) {
        this.moduleName = name;
        writer.print(".class public ");
        println(name);
        println(".super java/lang/Object");
    }

    public void writeStackAndLocals(int stack, int locals) {
        writer.print(".limit stack ");
        println(Integer.toString(stack));
        writer.print(".limit locals ");
        println(Integer.toString(locals));
    }

    public int writeFields(LinkedList<Element> fields) {
        int fieldsCounter = 0;
        for (Element field : fields) {
            writeField(field);
            Type fieldType = field.getType();
            fieldsCounter += (fieldType == Type.INTEGER || fieldType == Type.ARRAY) ? 1 : 0;
        }
        return fieldsCounter;
    }

    private void writeField(Element field) {
        if (field.getType() != Type.INTEGER && field.getType() != Type.ARRAY)
            return;
        writer.print(".field static " + field.getName() + " ");
        writer.print((field.getType() == Type.INTEGER) ? "I" : "[I");
        if (field.getType() == Type.INTEGER && field.getValue() != null) {
            writer.print(" = ");
            println(field.getValue());
        } else {
            writer.print("\n");
        }
    }


    public void writeInitMethod() {
        println(".method static public <clinit>()V");
    }

    public void writeBeginMethod(SymbolTable symbolTable) {
        String methodName = symbolTable.getName();
        if (methodName.equals("main")) {
            writeMainMethod();
            return;
        }
        writer.print(".method public static " + methodName + "(");
        LinkedList<Element> parameters = symbolTable.getParameters();
        for (Element element : parameters) {
            writer.print(element.getJasminType());
        }
        writer.print(")");
        println(symbolTable.getJasminReturnType());
    }

    public void writeMainMethod() {
        println(".method public static main([Ljava/lang/String;)V");
    }

    public void writeEndMethod() {

        println("return");
        println(".end method");
    }

    public void writeEndMethod(Element element) {

        if(element!=null && element.getName()!=null && element.getType() != Type.UNDEFINED){
            writeLoadElement(element);
        }
        else {
            writeEndMethod();
            return;
        }
        if(element.getType() == Type.INTEGER){
            println("ireturn");
        }
        else if(element.getType() == Type.ARRAY){
            println("areturn");
        }

        println(".end method");
    }

    public void writeWhile(ASTConditionalOperation conditionNode, ASTStatements statementNode, ParserVisitor visitor) {
        String beginLoopLabel = "loop" + lineNumber;
        String endLoopLabel = beginLoopLabel + "_end";

        println(beginLoopLabel + ":");

        writeCondition(conditionNode, visitor);

        println(endLoopLabel);

        SymbolTable currentSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();
        this.symbolTableContextManager.pushFront(currentSymbolTable.popChild());
        statementNode.jjtAccept(visitor, null);
        this.symbolTableContextManager.popFront();

        writer.println("goto " + beginLoopLabel);
        writer.println(endLoopLabel + ":");
    }

    public void writeIf(ASTConditionalOperation conditionNode, ASTStatements ifNode, ASTStatements elseNode, ParserVisitor visitor) {
        String elseLabel = "else_" + lineNumber;
        String endIfLabel = "if_" + lineNumber + "_end";
        SymbolTable currentSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();

        writeCondition(conditionNode, visitor);

        if(elseNode != null){
            println(elseLabel);
            this.symbolTableContextManager.pushFront(currentSymbolTable.popChild());
            ifNode.jjtAccept(visitor, null);
            this.symbolTableContextManager.popFront();
            writer.println("goto " + endIfLabel);
            writer.println(elseLabel + ":");
            this.symbolTableContextManager.pushFront(currentSymbolTable.popChild());
            elseNode.jjtAccept(visitor, null);
            this.symbolTableContextManager.popFront();

        }
        else {
            this.symbolTableContextManager.pushFront(currentSymbolTable.popChild());
            ifNode.jjtAccept(visitor, null);
        }
        writer.println(endIfLabel + ":");

    }

    private void writeCondition(ASTConditionalOperation conditionNode, ParserVisitor visitor) {
        conditionNode.jjtAccept(visitor, null);
        String condition = (String) conditionNode.jjtGetValue();
        writer.print(Utils.conditionalsHashMap.get(condition) + " ");
    }

    public void writePutstatic(Element element) {
        writer.print("putstatic" + moduleName + "/" + element.getName() + " ");
        println(element.getJasminType());

    }

    public void writeGetStatic(Element element) {
        writer.print("getstatic" + moduleName + "/" + element.getName() + " ");
        println(element.getJasminType());
    }

    public void writeInvokeStatic(String moduleName, String methodName, String types, String returnValue) {
        writer.print("invokestatic " + moduleName + "/" + methodName + "(" + types + ")");
        println(returnValue);
    }

    public void writeInvokeStatic(Element element) {
        writeInvokeStatic(moduleName, element.getName(), element.getJasminTypes(), element.getJasminReturnValueType());
    }


    public void writeSingleWord(String singleWord) {
        println("ldc " + singleWord);
    }

    public void writeArray() {
        println("newarray int");
    }

    public void writeArraySize() {
        println("arraylength");
    }

    public void writeLoadElement(Element element) {
        int varnum = element.getVarnum();
        if (element.getType() == Type.ARRAY) {
            if (varnum != -1) {
                writeAload(varnum);
                return;
            }
        }
        if (element.getType() == Type.INTEGER) {
            if (varnum != -1) {
                writeIload(varnum);
                return;
            }
        }
        writeGetStatic(element);

    }

    public void writeStoreElement(Element element, boolean storeIndex) {
        if (element.getType() == Type.INTEGER) {
            if (element.getVarnum() != -1) {
                writeIstore(element.getVarnum());
                return;
            }
        }
        if (element.getType() == Type.ARRAY) {
            if (storeIndex) {
                writeIastore();
                return;
            }
            if (element.getVarnum() != -1) {
                writeAstore(element.getVarnum());
                return;
            }
        }
        writePutstatic(element);
    }

    private void writeIstore(int value) {
        println("istore_" + value);
    }

    private void writeIastore() {
        println("iastore ");
    }

    private void writeAstore(int value) {
        println("astore_" + value);
    }

    private void writeAload(int lineNumber) {
        println("aload_" + lineNumber);
    }

    private void writeIload(int lineNumber) {
        println("iload_" + lineNumber);
    }

    public void writeIaload() {
        println("iaload");
    }

    public void writeSign(String sign) {
        println(Utils.operationsHashMap.get(sign));
    }

    public void writeIneg() {
        println("ineg");
    }

    public void writePop(){
        println("pop");
    }

    private void println(String line) {
        writer.println(line);
        lineNumber++;
    }

    private void println(Object object) {
        println(object.toString());
    }

    public SymbolTable getCurrentSymbolTable() {
        return this.symbolTableContextManager.getCurrentSymbolTable();
    }

    public SymbolTable getRootSymbolTable() {
        return this.symbolTableContextManager.getRootSymbolTable();
    }

    public void pushFront(SymbolTable symbolTable) {
        this.symbolTableContextManager.pushFront(symbolTable);
    }

    public void popFront() {
        this.symbolTableContextManager.popFront();
    }


}