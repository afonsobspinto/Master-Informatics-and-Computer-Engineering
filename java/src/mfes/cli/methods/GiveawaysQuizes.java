package mfes.cli.methods;

import io.bretty.console.view.MenuView;
import mfes.Pair;
import mfes.ProgramState;
import mfes.cli.SimplifiedAction;
import mfes.cli.Utils;
import mfes.models.*;
import org.overture.codegen.runtime.VDMSet;

public class GiveawaysQuizes extends SimplifiedAction {

  public static MenuView buildMenu() {
    GiveawaysQuizes items = new GiveawaysQuizes();
    return Utils.buildMenuView(
        "Competitions PLAY",
        Pair.of("Play giveaway", items::playGiveaway),
        Pair.of("Play quiz", items::playQuiz));
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

    if(giveawayEntry.calculateResult()){
      if (ProgramState.currentuser != null)
        ProgramState.currentuser.addPromotion(giveaway);
      System.out.println("Congratulations! You won");
    }
    else
      System.out.println("Oh, you lost! Better luck next time...");
  }

  private void playQuiz() {
    int quizIndex = this.prompt("quiz id: ", Integer.class);
    if (!Utils.indexInBounds(quizIndex, ProgramState.competitions)) {
      return;
    }

    Competition competition = ProgramState.competitions.get(quizIndex);

    Quiz quiz = null;
    if(competition instanceof Quiz) {
      quiz = (Quiz) competition;
    }
    else{
      System.out.println("Invalid ID");
      return;
    }

    VDMSet vdmset = quiz.getQuiz();

    QuizEntry quizEntry = new QuizEntry(vdmset);

    for(Object obj:vdmset){
      QA qa = (QA) obj;

      String answer = this.prompt(qa.getQuestion() + "? \n", String.class);

      quizEntry.addAnswer(qa, answer);
    }

    if(quizEntry.calculateResult()){
      if (ProgramState.currentuser != null)
        ProgramState.currentuser.addPromotion(quiz);
      System.out.println("Congratulations! You answered all questions correctly!");
    }
    else
      System.out.println("Oh, you lost! Better luck next time...");
  }

}
