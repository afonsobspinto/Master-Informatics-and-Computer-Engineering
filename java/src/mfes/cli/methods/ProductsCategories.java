package mfes.cli.methods;

import io.bretty.console.view.MenuView;
import mfes.Pair;
import mfes.ProgramState;
import mfes.cli.SimplifiedAction;
import mfes.cli.Utils;
import mfes.models.Brand;
import mfes.models.Category;
import mfes.models.Product;

public class ProductsCategories extends SimplifiedAction {

  public static MenuView buildMenu() {
    ProductsCategories items = new ProductsCategories();
    return Utils.buildMenuView(
        "Products, Category CRUD",
        Pair.of("List Products", items::listProducts),
        Pair.of("Create New Product", items::createProduct),
        Pair.of("List Categories", items::listCategories),
        Pair.of("Create New Category", items::createCategory));
  }

  public void listProducts() {
    String text = Utils.listOrderedList(ProgramState.products);
    this.println(text);
  }

  public void createProduct() {
    String name = this.prompt("name: ", String.class);
    String description = this.prompt("description: ", String.class);
    Product product = new Product(name, description, new Category("aw"), new Brand());
    ProgramState.products.add(product);

    this.println("created new product: " + product.toString());
  }

  public void listCategories() {
    String text = Utils.listOrderedList(ProgramState.categories);
    this.println(text);
  }

  public void createCategory() {
    String category = this.prompt("category: ", String.class);
    Category categoryModel = new Category(category);

    this.println("created category: " + categoryModel.toString());

    ProgramState.categories.add(categoryModel);
  }
}
