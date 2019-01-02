package mfes.models;

import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Category extends ContainingProducts {
  private String name;

  public Category(final String nam) {

//    throw new UnsupportedOperationException();
  }

  public String getName() {

    throw new UnsupportedOperationException();
  }

  public Category() {}

  public String toString() {

    return "Category{" + "name := " + Utils.toString(name) + "}";
  }
}
