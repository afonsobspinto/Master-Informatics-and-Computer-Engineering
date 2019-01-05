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
        Pair.of("Delete Product", items::deleteProduct),
        Pair.of("List Categories", items::listCategories),
        Pair.of("Create New Category", items::createCategory),
            Pair.of("Delete Category", items::deleteCategory));
  }

  private void listProducts() {
    String text = Utils.listOrderedList(ProgramState.products);
    this.println(text);
  }

  private void createProduct() {
    String name = this.prompt("name: ", String.class);
    String description = this.prompt("description: ", String.class);
    int categoryId = this.prompt("category id: ", Integer.class);
    if (!Utils.indexInBounds(categoryId, ProgramState.categories)) {
      return;
    }

    int brandId = this.prompt("brand id: ", Integer.class);
    if (!Utils.indexInBounds(brandId, ProgramState.brands)) {
      return;
    }

    Category category = ProgramState.categories.get(categoryId);
    Brand brand = ProgramState.brands.get(brandId);

    Product product = new Product(name, description, category, brand);
    ProgramState.products.add(product);

    this.println("created new product: " + product.toString());
  }

  private void deleteProduct() {
    int productIndex = this.prompt("product id: ", Integer.class);

    if (!Utils.indexInBounds(productIndex, ProgramState.products)) {
      return;
    }

    ProgramState.products.remove(productIndex);
    this.println("Removed Product");
  }

  private void listCategories() {
    String text = Utils.listOrderedList(ProgramState.categories);
    this.println(text);
  }

  private void createCategory() {
    String category = this.prompt("category: ", String.class);
    Category categoryModel = new Category(category);

    this.println("created category: " + categoryModel.toString());

    ProgramState.categories.add(categoryModel);
  }

  private void deleteCategory() {
    int categoryIndex = this.prompt("category id: ", Integer.class);

    if (!Utils.indexInBounds(categoryIndex, ProgramState.categories)) {
      return;
    }

    ProgramState.categories.remove(categoryIndex);
    this.println("Removed Category");
  }
}
