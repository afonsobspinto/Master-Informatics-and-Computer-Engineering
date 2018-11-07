package jadetest.alterego;

import jade.content.Predicate;

public class AlterEgo implements Predicate {

	private String name;
	private String otherName;
	
	public AlterEgo() {
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setOtherName(String otherName) {
		this.otherName = otherName;
	}

	public String getOtherName() {
		return otherName;
	}
	
}
