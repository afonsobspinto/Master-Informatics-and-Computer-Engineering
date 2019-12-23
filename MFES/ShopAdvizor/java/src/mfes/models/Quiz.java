package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Quiz extends Competition {
  private VDMSet quiz;

  public void cg_init_Quiz_1(final String nam, final VDMSet sor, final Brand b, final VDMSet qas) {

    name = nam;
    rewards = Utils.copy(sor);
    brand = b;
    quiz = Utils.copy(qas);
    competitionEntries = SeqUtil.seq();
    active = true;
  }

  public Quiz(final String nam, final VDMSet sor, final Brand b, final VDMSet qas) {

    cg_init_Quiz_1(nam, Utils.copy(sor), b, Utils.copy(qas));
  }

  public VDMSet getQuiz() {

    return Utils.copy(quiz);
  }

  public Quiz() {}

  public String toString() {

    return "Quiz{" + "quiz := " + Utils.toString(quiz) + " active := " + Utils.toString(active) + "}";
  }
}
