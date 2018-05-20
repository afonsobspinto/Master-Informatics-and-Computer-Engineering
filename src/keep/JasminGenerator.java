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
        writer.println(".super java/lang/Object");
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
        System.out.println(field.toString());
        if(field.getType() == Type.INTEGER && field.getValue() != null){
            writer.print(" = ");
            writer.println(field.getValue());
        }else{
            writer.print("\n");
        }
    }
}