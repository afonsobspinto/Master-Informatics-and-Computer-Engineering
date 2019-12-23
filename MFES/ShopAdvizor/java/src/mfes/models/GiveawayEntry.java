package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class GiveawayEntry extends CompetitionEntry {
  private Number number;
  private MATH math;
  private Number percentage;

  public void cg_init_GiveawayEntry_1(final Number percent) {

    won = false;
    number = -1L;
    math = new MATH();
    percentage = percent;
  }

  public GiveawayEntry(final Number percent) {

    cg_init_GiveawayEntry_1(percent);
  }

  public Number getNumber() {

    return number;
  }

  public Boolean calculateResult() {

    number = math.rand(100L);
    won = number.longValue() <= percentage.longValue();
    return won;
  }

  public GiveawayEntry() {}

  public String toString() {

    return "GiveawayEntry{"
        + "number := "
        + Utils.toString(number)
        + ", math := "
        + Utils.toString(math)
        + ", percentage := "
        + Utils.toString(percentage)
        + "}";
  }
}
