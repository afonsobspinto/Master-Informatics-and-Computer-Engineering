package HelloWorld;

import uchicago.src.sim.engine.SimInit;
import uchicago.src.sim.engine.SimpleModel;

public class MyHelloWorldModel extends SimpleModel {

	private int numberOfAgents;

	public MyHelloWorldModel() {
		name = "My Hello World Model";
	}

	public void setup() {
		super.setup();
		numberOfAgents = 3;
		autoStep = true;
		shuffle = true;
	}

	public void buildModel() {
		for(int i=0; i<numberOfAgents; i++)
			agentList.add(new MyHelloWorldAgent(i));
	}

	protected void preStep() {
		System.out.println("Initiating step " + getTickCount());
	}

	protected void postStep() {
		System.out.println("Done step " + getTickCount());
	}


	public static void main(String[] args) {
		SimInit init = new SimInit();
		MyHelloWorldModel model = new MyHelloWorldModel();
		init.loadModel(model, null, true);
	}

}
