package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class ContainingProducts {
  protected VDMSet products;

  public void cg_init_ContainingProducts_1() {

    products = SetUtil.set();
  }

  public ContainingProducts() {

    cg_init_ContainingProducts_1();
  }

  public void addProduct(final Product prod) {

    products = SetUtil.union(Utils.copy(products), SetUtil.set(prod));
  }

  public void removeProduct(final Product prod) {

    products = SetUtil.diff(Utils.copy(products), SetUtil.set(prod));
  }

  public VDMSet getProducts() {

    return Utils.copy(products);
  }

  public String toString() {

    return "ContainingProducts{" + "products := " + Utils.toString(products) + "}";
  }
}
