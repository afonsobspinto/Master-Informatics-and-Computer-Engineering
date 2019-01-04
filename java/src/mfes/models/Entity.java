package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Entity {
  private String name;

  public void cg_init_Entity_1(final String nam) {

    name = nam;
  }

  public Entity(final String nam) {

    cg_init_Entity_1(nam);
  }

  public String getName() {

    return name;
  }

  public Entity() {}

  public String toString() {

    return "Entity{" + "name := " + Utils.toString(name) + "}";
  }
}
