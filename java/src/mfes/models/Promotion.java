package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Promotion {
  private VDMSet reward;
  private Retailer retailer;

  public Promotion() {}

  public String toString() {

    return "Promotion{"
        + "reward := "
        + Utils.toString(reward)
        + ", retailer := "
        + Utils.toString(retailer)
        + "}";
  }
}
