package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class QA {
  private String question;
  private String answer;

  public void cg_init_QA_1(final String q, final String a) {

    question = q;
    answer = a;
  }

  public QA(final String q, final String a) {

    cg_init_QA_1(q, a);
  }

  public String getQuestion() {

    return question;
  }

  public String getAnswer() {

    return answer;
  }

  public Boolean evalAnswer(final String ans) {

    return Utils.equals(ans, answer);
  }

  public QA() {}

  public String toString() {

    return "QA{"
        + "question := "
        + Utils.toString(question)
        + ", answer := "
        + Utils.toString(answer)
        + "}";
  }
}
