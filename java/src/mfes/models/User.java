package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class User {
  private VDMSet reviews;
  private String name;
  private String email;

  public User(final String nam, final String em) {

    throw new UnsupportedOperationException();
  }

  public void addReview(final Review review) {

    throw new UnsupportedOperationException();
  }

  public VDMSet getReviews() {

    throw new UnsupportedOperationException();
  }

  public User() {}

  public String toString() {

    return "User{"
        + "reviews := "
        + Utils.toString(reviews)
        + ", name := "
        + Utils.toString(name)
        + ", email := "
        + Utils.toString(email)
        + "}";
  }
}
