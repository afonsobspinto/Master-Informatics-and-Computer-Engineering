package mfes.models;

import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Company {
  private String name;
  private String address;
  private String email;
  private String website;
  private VDMSet brands;

  public Company(final String nam, final String addr, final String em, final String webs) {

    throw new UnsupportedOperationException();
  }

  public void addBrand(final Brand bran) {

    throw new UnsupportedOperationException();
  }

  public VDMSet getBrands() {

    throw new UnsupportedOperationException();
  }

  public String getName() {

    throw new UnsupportedOperationException();
  }

  public String getAddress() {

    throw new UnsupportedOperationException();
  }

  public String getEmail() {

    throw new UnsupportedOperationException();
  }

  public String getWebsite() {

    throw new UnsupportedOperationException();
  }

  public Company() {}

  public String toString() {

    return "Company{"
        + "name := "
        + Utils.toString(name)
        + ", address := "
        + Utils.toString(address)
        + ", email := "
        + Utils.toString(email)
        + ", website := "
        + Utils.toString(website)
        + ", brands := "
        + Utils.toString(brands)
        + "}";
  }
}
