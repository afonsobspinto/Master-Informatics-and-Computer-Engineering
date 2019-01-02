package mfes.models;

import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class ContainingProducts {
  protected VDMSet products;

  public ContainingProducts() {

    throw new UnsupportedOperationException();
  }

  public void addProduct(final Product prod) {

    throw new UnsupportedOperationException();
  }

  public void removeProduct(final Product prod) {

    throw new UnsupportedOperationException();
  }

  public VDMSet getProducts() {

    throw new UnsupportedOperationException();
  }

  public String toString() {

    return "ContainingProducts{" + "products := " + Utils.toString(products) + "}";
  }
}
