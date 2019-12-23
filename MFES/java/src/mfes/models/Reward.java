package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Reward {
  protected String name;
  protected Product product;

  public void cg_init_Reward_1(final String nam, final Product prod) {

    name = nam;
    product = prod;
  }

  public Reward(final String nam, final Product prod) {

    cg_init_Reward_1(nam, prod);
  }

  public String getName() {

    return name;
  }

  public Product getProduct() {

    return product;
  }

  public Reward() {}

  public String toString() {

    return "Reward{"
        + "name := "
        + Utils.toString(name)
        + ", product := "
        + Utils.toString(product)
        + "}";
  }
}
