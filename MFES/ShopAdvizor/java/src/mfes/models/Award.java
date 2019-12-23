package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Award {
  private Product product;
  private Entity entity;
  private Category category;

  public void cg_init_Award_1(final Product prod, final Entity ent, final Category cat) {

    product = prod;
    entity = ent;
    category = cat;
  }

  public Award(final Product prod, final Entity ent, final Category cat) {

    cg_init_Award_1(prod, ent, cat);
  }

  public Product getProduct() {

    return product;
  }

  public Entity getEntity() {

    return entity;
  }

  public Category getCategory() {

    return category;
  }

  public Award() {}

  public String toString() {

    return "Award{"
        + "product := "
        + Utils.toString(product)
        + ", entity := "
        + Utils.toString(entity)
        + ", category := "
        + Utils.toString(category)
        + "}";
  }
}
