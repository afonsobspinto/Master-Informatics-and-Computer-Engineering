package HelloWorld;

import uchicago.src.sim.engine.Stepable;

public class MyHelloWorldAgent implements Stepable {
	private int id;

	public MyHelloWorldAgent(int id) {
		this.id = id;
	}

	public void step() {
		System.out.println(id + " Hello World!");
	}

}
