package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class QuizEntry extends CompetitionEntry {
  private VDMMap answers;
  private VDMSet quiz;

  public void cg_init_QuizEntry_1(final VDMSet q) {

    quiz = Utils.copy(q);
    answers = MapUtil.map();
    won = false;
  }

  public QuizEntry(final VDMSet q) {

    cg_init_QuizEntry_1(Utils.copy(q));
  }

  public void addAnswer(final QA qa, final String ans) {

    answers = MapUtil.override(Utils.copy(answers), MapUtil.map(new Maplet(qa, ans)));
  }

  public VDMSet getQuiz() {

    return Utils.copy(quiz);
  }

  public VDMMap getAnswers() {

    return Utils.copy(answers);
  }

  public Boolean calculateResult() {

    for (Iterator iterator_3 = quiz.iterator(); iterator_3.hasNext(); ) {
      QA qa = (QA) iterator_3.next();
      if (!(qa.evalAnswer(((String) Utils.get(answers, qa))))) {
        won = false;
        return false;

      } else {
        won = true;
      }
    }
    return won;
  }

  public QuizEntry() {}

  public String toString() {

    return "QuizEntry{"
        + "answers := "
        + Utils.toString(answers)
        + ", quiz := "
        + Utils.toString(quiz)
        + "}";
  }
}
