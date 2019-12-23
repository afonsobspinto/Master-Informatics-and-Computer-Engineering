package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Retailer extends ContainingProducts {
  private String name;

  public void cg_init_Retailer_1(final String nam) {

    products = SetUtil.set();
    name = nam;
  }

  public Retailer(final String nam) {

    cg_init_Retailer_1(nam);
  }

  public String getName() {

    return name;
  }

  public Retailer() {}

  public String toString() {

    return "Retailer{" + "name := " + Utils.toString(name) + "}";
  }
}
