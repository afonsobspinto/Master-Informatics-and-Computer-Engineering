package ServiceConsumerProvider.onto;

import jade.content.Predicate;

public class ServiceProposal implements Predicate {

	private static final long serialVersionUID = 1L;
	
	private String name;
	private double price;

	public ServiceProposal() {
	}

	public ServiceProposal(String name, double price) {
		this.name = name;
		this.price = price;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

}
