package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Award {
  private Product product;
  private Entity entity;

  public Award() {}

  public String toString() {

    return "Award{"
        + "product := "
        + Utils.toString(product)
        + ", entity := "
        + Utils.toString(entity)
        + "}";
  }
}
