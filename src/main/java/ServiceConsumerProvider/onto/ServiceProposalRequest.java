package ServiceConsumerProvider.onto;

import jade.content.Predicate;

public class ServiceProposalRequest implements Predicate {
	
	private static final long serialVersionUID = 1L;
	
	private String serviceName;

	public ServiceProposalRequest() {
	}
	
	public ServiceProposalRequest(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

}
