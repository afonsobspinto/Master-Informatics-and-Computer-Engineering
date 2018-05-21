import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.LinkedList;

public class JasminGenerator {

    private PrintWriter writer;

    private SymbolTable symbolTable;

    public SymbolTable getSymbolTable() {
        return symbolTable;
    }

    private JasminVisitor jasminVisitor;

    public JasminVisitor getJasminVisitor() {
        return jasminVisitor;
    }

    private String filepath;

    private Integer lineNumber = 0;

    public String getFilepath() {
        return filepath;
    }

    public JasminGenerator(String fileName, SymbolTable symbolTable){
        this.symbolTable = symbolTable;
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
        writer.print(".class public ");
        writer.println(name);
        lineNumber++;
        writer.println(".super java/lang/Object");
        lineNumber++;
    }

    private void writeStackAndLocals(int stack, int locals){
        writer.print(".limit stack ");
        writer.println(Integer.toString(stack));
        lineNumber++;
        writer.print(".limit locals ");
        writer.println(Integer.toString(locals));
        lineNumber++;
    }

    public void writeFields(LinkedList<Element> fields){
        for(Element field : fields){
            writeField(field);
        }
    }

    private void writeField(Element field){
        if(field.getType() != Type.INTEGER && field.getType() != Type.ARRAY)
            return;
        writer.print(".field static " + field.getName() + " ");
        writer.print((field.getType() == Type.INTEGER)? "I" : "[I");
        if(field.getType() == Type.INTEGER && field.getValue() != null){
            writer.print(" = ");
            writer.println(field.getValue());
            lineNumber++;
        }else{
            writer.print("\n");
        }
    }

    public void writeEndMethod(){
        writer.println("return");
        lineNumber++;
        writer.println(".end method");
        lineNumber++;
    }
}