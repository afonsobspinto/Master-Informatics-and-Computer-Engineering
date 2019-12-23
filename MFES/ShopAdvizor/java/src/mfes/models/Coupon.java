package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Coupon extends Reward {
  protected Number discount;

  public void cg_init_Coupon_1(final String nam, final Product prod, final Number dis) {

    name = nam;
    product = prod;
    discount = dis;
  }

  public Coupon(final String nam, final Product prod, final Number dis) {

    cg_init_Coupon_1(nam, prod, dis);
  }

  public Number getDiscount() {

    return discount;
  }

  public void setDiscount(final Number dis) {

    discount = dis;
  }

  public Coupon() {}

  public String toString() {

    return "Coupon{" + "discount := " + Utils.toString(discount) + "}";
  }
}
