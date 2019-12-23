package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Brand extends ContainingProducts {
  private String name;
  private Company company;

  public void cg_init_Brand_1(final String nam, final Company compan) {

    products = SetUtil.set();
    name = nam;
    company = compan;
    company.addBrand(this);
  }

  public Brand(final String nam, final Company compan) {

    cg_init_Brand_1(nam, compan);
  }

  public Company getCompany() {

    return company;
  }

  public String getName() {

    return name;
  }

  public Brand() {}

  public String toString() {

    return "Brand{"
        + "name := "
        + Utils.toString(name)
        + ", company := "
        + Utils.toString(company.getName())
        + "}";
  }
}
