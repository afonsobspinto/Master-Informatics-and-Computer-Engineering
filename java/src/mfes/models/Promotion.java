package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Promotion {
  protected Boolean active;
  protected String name;
  protected VDMSet rewards;
  protected Brand brand;

  public void cg_init_Promotion_1(final String nam, final VDMSet sor, final Brand b) {

    name = nam;
    rewards = Utils.copy(sor);
    brand = b;
  }

  public Promotion(final String nam, final VDMSet sor, final Brand b) {

    cg_init_Promotion_1(nam, Utils.copy(sor), b);
  }

  public Boolean isActive() {

    return active;
  }

  public void setActive(final Boolean act) {

    active = act;
  }

  public String getName() {

    return name;
  }

  public VDMSet getRewards() {

    return Utils.copy(rewards);
  }

  public Brand getBrand() {

    return brand;
  }

  public Promotion() {}

  public String toString() {

    return "Promotion{"
        + "name := "
        + Utils.toString(name)
        + ", rewards := "
        + Utils.toString(rewards)
        + ", brand := "
        + Utils.toString(brand)
        + "active := "
        + Utils.toString(active)
        + "}";
  }
}
