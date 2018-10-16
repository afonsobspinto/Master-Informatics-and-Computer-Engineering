package ServiceConsumerProvider.onto;

import jade.content.Concept;

public class ContractOutcome implements Concept {

	private static final long serialVersionUID = 1L;

	public enum Value {SUCCESS, FAILURE};
	
	private Value value;
	
	public ContractOutcome() {
	}
	
	public ContractOutcome(Value value) {
		this.setValue(value);
	}

	public Value getValue() {
		return value;
	}

	public void setValue(Value value) {
		this.value = value;
	}
	
}
