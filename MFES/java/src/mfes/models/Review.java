package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Review {
  private User user;
  private Product product;
  private Number rating;
  private String description;

  public void cg_init_Review_1(
          final User usr, final Product prod, final Number ratng, final String desc) {

    user = usr;
    user.addReview(this);
    product = prod;
    product.addReview(this);
    rating = ratng;
    description = desc;
  }

  public Review(final User usr, final Product prod, final Number ratng, final String desc) {

    cg_init_Review_1(usr, prod, ratng, desc);
  }

  public Product getProduct() {

    return product;
  }

  public User getUser() {

    return user;
  }

  public Number getRating() {

    return rating;
  }

  public String getDescription() {

    return description;
  }

  public Review() {}

  public String toString() {

    return "Review{"
            + "user := "
            + Utils.toString(user.getName())
            + ", product := "
            + Utils.toString(product.getName())
            + ", rating := "
            + Utils.toString(rating)
            + ", description := "
            + Utils.toString(description)
            + "}";
  }
}
