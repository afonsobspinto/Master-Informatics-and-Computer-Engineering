package mfes.cli.methods;

import io.bretty.console.view.ActionView;
import io.bretty.console.view.MenuView;
import mfes.Pair;
import mfes.ProgramState;
import mfes.cli.SimplifiedAction;
import mfes.cli.Utils;
import mfes.models.Product;
import mfes.models.Review;
import mfes.models.User;

public class UsersReviews extends SimplifiedAction {

  public static MenuView buildMenu() {
    UsersReviews items = new UsersReviews();
    return Utils.buildMenuView(
        "Users, Reviews CRUD",
        Pair.of("List Users", items::listUsers),
        Pair.of("Create User", items::createUser),
        Pair.of("Delete User", items::deleteUser),
        Pair.of("List Reviews", items::listReviews),
        Pair.of("Create Review", items::createReview),
        Pair.of("Delete Review", items::deleteReview));
  }

  private void createUser() {
    String name = this.prompt("name: ", String.class);
    String email = this.prompt("email: ", String.class);

    User user = new User(name, email);
    this.println("Created user: " + user.toString());
    ProgramState.users.add(user);
  }

  private void listUsers() {
    String text = Utils.listOrderedList(ProgramState.users);
    this.println(text);
  }

  private void deleteUser() {
    int userIndex = this.prompt("user id: ", Integer.class);

    if (!Utils.indexInBounds(userIndex, ProgramState.users)) {
      return;
    }

    ProgramState.users.remove(userIndex);
    this.println("Removed User");
  }

  private void createReview() {
    int rating = this.prompt("rating: ", Integer.class);

    if (rating < 1 || rating > 5) {
      this.print("Invalid rating");
      return;
    }

    String description = this.prompt("description: ", String.class);

    int userIndex = this.prompt("user id: ", Integer.class);

    if (!Utils.indexInBounds(userIndex, ProgramState.users)) {
      return;
    }

    int productIndex = this.prompt("product id: ", Integer.class);

    if (!Utils.indexInBounds(productIndex, ProgramState.products)) {
      return;
    }

    User user = ProgramState.users.get(userIndex);
    Product product = ProgramState.products.get(productIndex);

    Review review = new Review(user, product, rating, description);

    this.println("Created review: " + review.toString());
    ProgramState.reviews.add(review);
  }

  private void listReviews() {
    String text = Utils.listOrderedList(ProgramState.reviews);
    this.println(text);
  }

  private void deleteReview() {
    int reviewIndex = this.prompt("review id: ", Integer.class);

    if (!Utils.indexInBounds(reviewIndex, ProgramState.reviews)) {
      return;
    }

    ProgramState.reviews.remove(reviewIndex);
    this.println("Removed Review");
  }
}
