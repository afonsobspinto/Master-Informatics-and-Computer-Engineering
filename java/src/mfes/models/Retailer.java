package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Retailer {
  private VDMSet product;

  public Retailer() {}

  public String toString() {

    return "Retailer{" + "product := " + Utils.toString(product) + "}";
  }
}
