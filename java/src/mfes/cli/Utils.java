package mfes.cli;

import io.bretty.console.view.MenuView;
import mfes.Pair;
import mfes.ProgramState;

import java.util.List;

public class Utils {
  public static MenuView buildMenuView(String menuTitle, Pair<String, Runnable>... menuItems) {
    MenuView menuView = new MenuView(menuTitle, menuTitle);

    for (Pair<String, Runnable> item : menuItems) {
      menuView.addMenuItem(new SimplifiedAction(item.first, item.second));
    }

    return menuView;
  }

  public static String listOrderedList(List list) {
    String acum = "";
    for (int i = 0; i < list.size(); i++) {
      acum += "id:" + i + " - " + list.get(i).toString() + "\n\n";
    }

    return acum;
  }

  public static boolean indexInBounds(int companyIndex, List bounds) {
    if (companyIndex < 0 || companyIndex >= bounds.size()) {
      System.out.println("Invalid company id");
      return false;
    }

    return true;
  }
}
