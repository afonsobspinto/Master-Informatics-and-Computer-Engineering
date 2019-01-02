package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Review {
  private User user;
  private Product product;
  private Number rating;
  private String description;

  public Review(final User usr, final Product prod, final Number ratng, final String desc) {

    throw new UnsupportedOperationException();
  }

  public Product getProduct() {

    throw new UnsupportedOperationException();
  }

  public User getUser() {

    throw new UnsupportedOperationException();
  }

  public Number getRating() {

    throw new UnsupportedOperationException();
  }

  public String getDescription() {

    throw new UnsupportedOperationException();
  }

  public Review() {}

  public String toString() {

    return "Review{"
        + "user := "
        + Utils.toString(user)
        + ", product := "
        + Utils.toString(product)
        + ", rating := "
        + Utils.toString(rating)
        + ", description := "
        + Utils.toString(description)
        + "}";
  }
}
