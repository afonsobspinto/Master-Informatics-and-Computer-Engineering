package mfes.cli;

import io.bretty.console.view.ActionView;
import io.bretty.console.view.MenuView;
import mfes.cli.methods.CompaniesBrands;
import mfes.cli.methods.ProductsCategories;
import mfes.cli.methods.PromotionsCompetitions;
import mfes.cli.methods.UsersReviews;

public class RootMenu extends ActionView {

  public RootMenu() {
    super("ShopWiz Admin Console", "ShopWiz");
  }

  @Override
  public void executeCustomAction() {
    MenuView rootMenu = new MenuView("Select CRUD category", "CRUD");

    MenuView productsMenu = ProductsCategories.buildMenu();
    MenuView companiesMenu = CompaniesBrands.buildMenu();
    MenuView usersMenu = UsersReviews.buildMenu();
    MenuView promotionsMenu = PromotionsCompetitions.buildMenu();

    rootMenu.addMenuItem(companiesMenu);
    rootMenu.addMenuItem(productsMenu);
    rootMenu.addMenuItem(usersMenu);
    rootMenu.addMenuItem(promotionsMenu);
    rootMenu.display();
  }

}
