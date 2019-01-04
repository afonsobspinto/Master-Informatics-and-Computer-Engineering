package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Giveaway extends Competition {
  private Number percentage;

  public void cg_init_Giveaway_1(
      final String nam, final VDMSet sor, final Brand b, final Number p) {

    name = nam;
    rewards = Utils.copy(sor);
    brand = b;
    percentage = p;
    competitionEntries = SeqUtil.seq();
  }

  public Giveaway(final String nam, final VDMSet sor, final Brand b, final Number p) {

    cg_init_Giveaway_1(nam, Utils.copy(sor), b, p);
  }

  public Number getPercentage() {

    return percentage;
  }

  public Giveaway() {}

  public String toString() {

    return "Giveaway{" + "percentage := " + Utils.toString(percentage) + "}";
  }
}
