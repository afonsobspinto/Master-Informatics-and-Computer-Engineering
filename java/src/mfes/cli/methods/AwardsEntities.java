package mfes.cli.methods;

import io.bretty.console.view.MenuView;
import io.bretty.console.view.Validator;
import mfes.Pair;
import mfes.ProgramState;
import mfes.cli.SimplifiedAction;
import mfes.cli.Utils;
import mfes.models.*;
import org.overture.codegen.runtime.VDMSet;


public class AwardsEntities extends SimplifiedAction {

    public static MenuView buildMenu() {
        AwardsEntities items = new AwardsEntities();
        return Utils.buildMenuView(
                "Awards, Entities CRUD",
                Pair.of("List Awards", items::listAwards),
                Pair.of("List Entities", items::listEntities),
                Pair.of("Create Entity", items::createEntity),
                Pair.of("Create Award", items::createAward),
                Pair.of("Delete Entity", items::deleteEntity),
                Pair.of("Delete Award", items::deleteAward));
    }

    private void listAwards() {
        String text = Utils.listOrderedList(ProgramState.awards);
        this.println(text);
    }

    private void listEntities() {
        String text = Utils.listOrderedList(ProgramState.entities);
        this.println(text);
    }

    private void createEntity() {

        String name = this.prompt("name: ", String.class);

        Entity entity = new Entity(name);
        ProgramState.entities.add(entity);
        this.println("Created entity: " + entity.toString());
    }

    public void createAward() {
        int entityIndex = this.prompt("entity id: ", Integer.class);
        if (!Utils.indexInBounds(entityIndex, ProgramState.entities)) {
            return;
        }

        int categoryId = this.prompt("category id: ", Integer.class);
        if (!Utils.indexInBounds(categoryId, ProgramState.categories)) {
            return;
        }

        int productId = this.prompt("product id: ", Integer.class);
        if (!Utils.indexInBounds(productId, ProgramState.products)) {
            return;
        }

        Entity entity = ProgramState.entities.get(entityIndex);
        Category category = ProgramState.categories.get(categoryId);
        Product product = ProgramState.products.get(productId);

        Award award = new Award(product, entity, category);

        ProgramState.awards.add(award);
        this.println("Created award: " + award.toString());
    }

    public void deleteEntity() {
        int entityIndex = this.prompt("entity id: ", Integer.class);

        if (!Utils.indexInBounds(entityIndex, ProgramState.entities)) {
            return;
        }

        ProgramState.entities.remove(entityIndex);
        this.println("Removed entity");
    }

    public void deleteAward() {
        int awardIndex = this.prompt("award id: ", Integer.class);

        if (!Utils.indexInBounds(awardIndex, ProgramState.awards)) {
            return;
        }

        ProgramState.awards.remove(awardIndex);
        this.println("Removed award");
    }
}
