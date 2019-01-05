package mfes.cli.methods;

import io.bretty.console.view.MenuView;
import mfes.Pair;
import mfes.ProgramState;
import mfes.cli.SimplifiedAction;
import mfes.cli.Utils;
import mfes.models.*;

public class GiveawaysQuizes extends SimplifiedAction {

  public static MenuView buildMenu() {
    GiveawaysQuizes items = new GiveawaysQuizes();
    return Utils.buildMenuView(
        "Competitions PLAY",
        Pair.of("Play giveaway", items::playGiveaway));
  }

  private void playGiveaway() {
    int giveawayIndex = this.prompt("giveaway id: ", Integer.class);
    if (!Utils.indexInBounds(giveawayIndex, ProgramState.competitions)) {
      return;
    }

    Competition competition = ProgramState.competitions.get(giveawayIndex);

    Giveaway giveaway = null;
    if(competition instanceof Giveaway) {
      giveaway = (Giveaway) competition;
    }
    else{
      System.out.println("Invalid ID");
      return;
    }

    Number winningChanges = giveaway.getPercentage();

    GiveawayEntry giveawayEntry = new GiveawayEntry(winningChanges);

    if(giveawayEntry.calculateResult())
      System.out.println("Congratulations! You won");
    else
      System.out.println("Oh, you lost! Better luck next time...");
  }


}
