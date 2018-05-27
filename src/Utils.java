import java.util.HashMap;

public class Utils {
    public static HashMap<String,String> conditionalsHashMap= new HashMap<String,String>();
    public static HashMap<String,String> operationsHashMap= new HashMap<String,String>();

    static {
        conditionalsHashMap.put(">", "if_icmple");
        conditionalsHashMap.put(">=", "if_icmplt");
        conditionalsHashMap.put("<", "if_icmpge");
        conditionalsHashMap.put("<=", "if_icmpgt");
        conditionalsHashMap.put("==", "if_icmpne");
        conditionalsHashMap.put("!=", "if_icmpeq");
        
        operationsHashMap.put("+", "iadd");
        operationsHashMap.put("-", "isub");
        operationsHashMap.put("*", "imul");
        operationsHashMap.put("/", "idiv");
    }

}
