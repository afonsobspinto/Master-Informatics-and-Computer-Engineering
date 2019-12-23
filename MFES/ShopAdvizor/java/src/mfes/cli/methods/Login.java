package mfes.cli.methods;

import io.bretty.console.view.MenuView;
import mfes.Pair;
import mfes.ProgramState;
import mfes.cli.SimplifiedAction;
import mfes.cli.Utils;
import mfes.models.*;
import org.overture.codegen.runtime.VDMSet;

public class Login extends SimplifiedAction {

    public static MenuView buildMenu() {
        Login items = new Login();
        return Utils.buildMenuView(
                "Login/Logout",
                Pair.of("Login", items::login),
                Pair.of("Logout", items::logout));
    }

    private void login() {
        int userIndex = this.prompt("user id: ", Integer.class);
        if (!Utils.indexInBounds(userIndex, ProgramState.users)) {
            return;
        }

        ProgramState.currentuser = ProgramState.users.get(userIndex);

        System.out.println("You're logged in!");
    }

    private void logout() {
        ProgramState.currentuser = null;

        System.out.println("You logged out!");
    }
}