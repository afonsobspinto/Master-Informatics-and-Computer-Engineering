package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Competition extends Promotion {

  protected VDMSeq competitionEntries;

  public void cg_init_Competition_1(final String nam, final VDMSet sor, final Brand b) {

    name = nam;
    rewards = Utils.copy(sor);
    brand = b;
    active = true;
    competitionEntries = SeqUtil.seq();
  }

  public Competition(final String nam, final VDMSet sor, final Brand b) {

    cg_init_Competition_1(nam, Utils.copy(sor), b);
  }


  public VDMSeq getEntries() {

    return Utils.copy(competitionEntries);
  }


  public void addEntry(final CompetitionEntry entry) {

    competitionEntries = SeqUtil.conc(Utils.copy(competitionEntries), SeqUtil.seq(entry));
  }

  public Competition() {}

  public String toString() {

    return "Competition{"
        + "active := "
        + Utils.toString(active)
        + ", competitionEntries := "
        + Utils.toString(competitionEntries)
        + "}";
  }
}
