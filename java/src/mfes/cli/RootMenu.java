package mfes.cli;

import io.bretty.console.view.ActionView;
import io.bretty.console.view.MenuView;
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
        MenuView menuView = new MenuView("Products CRUD", "Products CRUD");

        menuView.addMenuItem(new SimplifiedAction("List Products", products::listProducts));
        menuView.addMenuItem(new SimplifiedAction("Create New Product", products::registerNewProduct));

        return menuView;
    }

}
