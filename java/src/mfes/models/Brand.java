package mfes.models;

import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Brand extends ContainingProducts {
  private String name;
  private Company company;

  public Brand(final String nam, final Company compan) {

    throw new UnsupportedOperationException();
  }

  public Company getCompany() {

    throw new UnsupportedOperationException();
  }

  public String getName() {

    throw new UnsupportedOperationException();
  }

  public Brand() {}

  public String toString() {

    return "Brand{"
        + "name := "
        + Utils.toString(name)
        + ", company := "
        + Utils.toString(company)
        + "}";
  }
}
