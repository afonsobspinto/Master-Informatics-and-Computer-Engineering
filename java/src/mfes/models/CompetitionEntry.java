package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class CompetitionEntry {
  protected Boolean won;

  public void cg_init_CompetitionEntry_1() {

    won = false;
  }

  public CompetitionEntry() {

    cg_init_CompetitionEntry_1();
  }

  public Boolean hasWon() {

    return won;
  }

  public void setWon(final Boolean w) {

    won = w;
  }

  public String toString() {

    return "CompetitionEntry{" + "won := " + Utils.toString(won) + "}";
  }
}
