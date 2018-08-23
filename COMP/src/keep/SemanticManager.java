import java.util.LinkedList;

public class SemanticManager {
	
	public static LinkedList<String> errors = new LinkedList<>();
	
	public static void addError(String error){
		errors.add(error);
	}
	
	public static void addError(int line, String error){
		errors.add(line + ":" + error);
	}
	
	public static String getString(){
		StringBuilder sb = new StringBuilder();
		for(String e : errors){
			sb.append(e);
			sb.append("\n");
		}
		return sb.toString();
	}
	
	public static int getErrorCount() {
		return errors.size();
	}
	
	public static void clearErrors() {
		errors.clear();
	}
	
}
