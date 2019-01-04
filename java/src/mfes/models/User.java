package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class User {
  private VDMSet reviews;
  private String name;
  private String email;

  public void cg_init_User_1(final String nam, final String em) {

    name = nam;
    email = em;
    reviews = SetUtil.set();
  }

  public User(final String nam, final String em) {

    cg_init_User_1(nam, em);
  }

  public void addReview(final Review review) {

    reviews = SetUtil.union(Utils.copy(reviews), SetUtil.set(review));
  }

  public VDMSet getReviews() {

    return Utils.copy(reviews);
  }

  public String getName() {

    return name;
  }

  public String getEmail() {

    return email;
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
