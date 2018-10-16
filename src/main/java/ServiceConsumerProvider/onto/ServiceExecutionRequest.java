package ServiceConsumerProvider.onto;

import jade.content.AgentAction;

public class ServiceExecutionRequest implements AgentAction {
	
	private static final long serialVersionUID = 1L;
	
	private String serviceName;

	public ServiceExecutionRequest() {
	}
	
	public ServiceExecutionRequest(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

}
