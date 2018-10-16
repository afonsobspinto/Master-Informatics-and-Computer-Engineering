package ServiceConsumerProvider.onto;

import jade.content.Predicate;

import java.util.ArrayList;

public class Results implements Predicate {

	private static final long serialVersionUID = 1L;
	
	private int providerFilterSize;
	private ArrayList<ContractOutcome> contractOutcomes;

	public Results() {
	}

	public Results(int providerFilterSize, ArrayList<ContractOutcome> contractOutcomes) {
		this.setProviderFilterSize(providerFilterSize);
		this.setContractOutcomes(contractOutcomes);
	}

	public int getProviderFilterSize() {
		return providerFilterSize;
	}

	public void setProviderFilterSize(int providerFilterSize) {
		this.providerFilterSize = providerFilterSize;
	}

	public ArrayList<ContractOutcome> getContractOutcomes() {
		return contractOutcomes;
	}

	public void setContractOutcomes(ArrayList<ContractOutcome> contractOutcomes) {
		this.contractOutcomes = contractOutcomes;
	}

}
