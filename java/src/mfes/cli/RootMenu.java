package mfes.cli;

import io.bretty.console.view.ActionView;
import io.bretty.console.view.MenuView;
import mfes.Pair;
import mfes.cli.methods.Products;

public class RootMenu extends ActionView {

  public RootMenu() {
    super("ShopWiz Admin Console", "ShopWiz");
  }

  @Override
  public void executeCustomAction() {
    MenuView rootMenu = new MenuView("Select CRUD category", "CRUD");

    MenuView productsMenu = buildProductsMenu();

    rootMenu.addMenuItem(productsMenu);
    rootMenu.display();
  }

  public static MenuView buildProductsMenu() {
    Products products = new Products();
    return buildMenuView("Products CRUD",
            Pair.of("List Products", products::listProducts),
            Pair.of("Create New Product", products::registerNewProduct));
  }

  private static MenuView buildMenuView(String menuTitle, Pair<String, Runnable>... menuItems) {
    MenuView menuView = new MenuView(menuTitle, menuTitle);

    for (Pair<String, Runnable> item : menuItems) {
      menuView.addMenuItem(new SimplifiedAction(item.first, item.second));
    }

    return menuView;
  }
}
