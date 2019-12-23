package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class FreeProduct extends Reward {
  private Number discount;

  public void cg_init_FreeProduct_1(final String nam, final Product prod) {

    name = nam;
    product = prod;
    discount = 100L;
  }

  public FreeProduct(final String nam, final Product prod) {

    cg_init_FreeProduct_1(nam, prod);
  }

  public String getName() {

    return name;
  }

  public Number getDiscount() {

    return discount;
  }

  public FreeProduct() {}

  public String toString() {

    return "FreeProduct{" + "discount := " + Utils.toString(discount) + "}";
  }
}
