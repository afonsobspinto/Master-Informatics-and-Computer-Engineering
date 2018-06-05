import java.util.LinkedList;

public class SymbolTableContextManager {
    private LinkedList<SymbolTable> contextSwitcher = new LinkedList<SymbolTable>();

    public SymbolTableContextManager(SymbolTable symbolTable) {
        this.contextSwitcher.push(symbolTable);
    }

    public SymbolTable getCurrentSymbolTable(){
        return this.contextSwitcher.getFirst();
    }

    public void pushFront(SymbolTable symbolTable){
        this.contextSwitcher.push(symbolTable);
    }

    public SymbolTable popFront(){ return this.contextSwitcher.removeFirst();   }

    public SymbolTable getRootSymbolTable(){
        return this.contextSwitcher.getLast();
    }

}
