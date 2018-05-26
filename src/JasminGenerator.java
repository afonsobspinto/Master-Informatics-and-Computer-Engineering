import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.LinkedList;

public class JasminGenerator {

    private PrintWriter writer;

    private SymbolTableContextManager symbolTableContextManager;

    public SymbolTableContextManager getSymbolTableContextManager() {
        return symbolTableContextManager;
    }

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

    public JasminGenerator(String fileName, SymbolTable symbolTable){
        this.symbolTableContextManager = new SymbolTableContextManager(symbolTable);
        this.filepath = fileName.replace(".yal", "_generated.j");
        try {
            writer = new PrintWriter(this.filepath);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        this.jasminVisitor = new JasminVisitor(this);
    }

    public void close(){
        writer.close();
    }

    public void writeModule(String name){
        this.moduleName = name;
        writer.print(".class public ");
        println(name);
        println(".super java/lang/Object");
    }

    private void writeStackAndLocals(int stack, int locals){
        writer.print(".limit stack ");
        println(Integer.toString(stack));
        writer.print(".limit locals ");
        println(Integer.toString(locals));
    }

    public int writeFields(LinkedList<Element> fields){
        int fieldsCounter = 0;
        for(Element field : fields){
            writeField(field);
            Type fieldType = field.getType();
            fieldsCounter += (fieldType == Type.INTEGER || fieldType == Type.ARRAY)? 1:0;
        }
        return fieldsCounter;
    }

    private void writeField(Element field){
        if(field.getType() != Type.INTEGER && field.getType() != Type.ARRAY)
            return;
        writer.print(".field static " + field.getName() + " ");
        writer.print((field.getType() == Type.INTEGER)? "I" : "[I");
        if(field.getType() == Type.INTEGER && field.getValue() != null){
            writer.print(" = ");
            println(field.getValue());
        }else{
            writer.print("\n");
        }
    }


    public void writeInitMethod(){
        println(".method static public <clinit>()V");
    }

    public void writeBeginMethod(SymbolTable symbolTable){
        writer.print(".method public static " + symbolTable.getName() + "(");
        LinkedList<Element> parameters = symbolTable.getParameters();
        for (Element element : parameters){
            writer.print(element.getJasminType());
        }
        writer.print(")");
        println(symbolTable.getJasminReturnType());
    }
    public void writeEndMethod(){
        println("return");
        println(".end method");
    }

    public void writeWhile(ASTConditionalOperation conditionNode ,ASTStatements statementNode ,ParserVisitor visitor){
        String beginLoopLabel = "ll_" + lineNumber;
        String endLoopLabel = "el_" + lineNumber;

        writer.print(beginLoopLabel);
        println(" :");

        //writeWhileVariables();

        String condition = (String)conditionNode.jjtGetValue();
        writer.print(Utils.conditionalsHashMap.get(condition) + " ");
        println(endLoopLabel);

        //SymbolTable currentSymbolTable = this.symbolTableContextManager.getCurrentSymbolTable();
        //this.symbolTableContextManager.pushFront(currentSymbolTable.popChild());
        //statementNode.jjtAccept(visitor, null);
       //this.symbolTableContextManager.popFront();

        writer.print("goto ");
        println(beginLoopLabel);
        writer.print(endLoopLabel);
        println(" :");

    }

/*    public void putstatic(Element element){
        writer.print("putstatic" + moduleName + "/" + element.getName() + " ");
        println(element.getJasminType());

    }*/

    private void println(String line){
        writer.println(line);
        lineNumber++;
    }

    private void println(Object object){
        println(object.toString());
    }
}