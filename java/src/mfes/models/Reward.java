package mfes.models;

import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Reward {
  private Product product;

  public Reward() {}

  public String toString() {

    return "Reward{" + "product := " + Utils.toString(product) + "}";
  }
}
