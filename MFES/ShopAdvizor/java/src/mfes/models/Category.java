package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Category extends ContainingProducts {
  private String name;

  public void cg_init_Category_1(final String nam) {

    name = nam;
    products = SetUtil.set();
  }

  public Category(final String nam) {

    cg_init_Category_1(nam);
  }

  public String getName() {

    return name;
  }

  public Category() {}

  public String toString() {

    return "Category{" + "name := " + Utils.toString(name) + "}";
  }
}
