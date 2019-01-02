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

    MenuView productsMenu = Products.buildProductsMenu();

    rootMenu.addMenuItem(productsMenu);
    rootMenu.display();
  }

}
