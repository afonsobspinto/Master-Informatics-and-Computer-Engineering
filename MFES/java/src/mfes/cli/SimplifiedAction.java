package mfes.cli;

import io.bretty.console.view.ActionView;

public class SimplifiedAction extends ActionView {

  private Runnable action = () -> {};

  public SimplifiedAction() {
    super("", "");
  }

  public SimplifiedAction(String title, Runnable action) {
    super(title, title);
    this.action = action;
  }

  @Override
  public void executeCustomAction() {
    action.run();
  }
}
