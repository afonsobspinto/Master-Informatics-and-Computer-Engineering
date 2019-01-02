package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Company {
  private String name;
  private String address;
  private String email;
  private String website;
  private VDMSet brands;

  public void cg_init_Company_1(
      final String nam, final String addr, final String em, final String webs) {

    name = nam;
    address = addr;
    email = em;
    website = webs;
    brands = SetUtil.set();
  }

  public Company(final String nam, final String addr, final String em, final String webs) {

    cg_init_Company_1(nam, addr, em, webs);
  }

  public void addBrand(final Brand bran) {

    brands = SetUtil.union(Utils.copy(brands), SetUtil.set(bran));
  }

  public VDMSet getBrands() {

    return Utils.copy(brands);
  }

  public String getName() {

    return name;
  }

  public String getAddress() {

    return address;
  }

  public String getEmail() {

    return email;
  }

  public String getWebsite() {

    return website;
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
