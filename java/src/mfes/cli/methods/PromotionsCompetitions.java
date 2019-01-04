package mfes.cli.methods;

import io.bretty.console.view.MenuView;
import io.bretty.console.view.Validator;
import mfes.Pair;
import mfes.ProgramState;
import mfes.cli.SimplifiedAction;
import mfes.cli.Utils;
import mfes.models.*;
import org.overture.codegen.runtime.VDMSet;


public class PromotionsCompetitions extends SimplifiedAction {

    public static MenuView buildMenu() {
        PromotionsCompetitions items = new PromotionsCompetitions();
        return Utils.buildMenuView(
                "Promotions, Competitions CRUD",
                Pair.of("List Promotions", items::listPromotions),
                Pair.of("List Competitions", items::listCompetitions),
                Pair.of("Create Promotion", items::createPromotion),
                Pair.of("Create Quiz", items::createQuiz),
                Pair.of("Create Giveaway", items::createGiveaway),
                Pair.of("Stop Promotion", items::stopPromotion),
                Pair.of("Stop Competition", items::stopCompetition)

        );}

    private void listPromotions() {
        String text = Utils.listOrderedList(ProgramState.promotions);
        this.println(text);
    }

    private void listCompetitions() {
        String text = Utils.listOrderedList(ProgramState.competitions);
        this.println(text);
    }

    private void createPromotion() {

        Promo promo = createPromo();
        if(promo==null)
            return;

        Promotion promotion = new Promotion(promo.name, promo.rewards , promo.brand);

        ProgramState.promotions.add(promotion);
        this.println("Created promotion: " + promotion.toString());
    }

    private void createQuiz() {
        Promo promo = createPromo();
        if(promo==null)
            return;

        int quizQuestions = this.prompt("#quiz questions: ", Integer.class);
        VDMSet vdmSet = new VDMSet();
        for(int i = 0; i < quizQuestions; quizQuestions++){
            String question = this.prompt("question: ", String.class);
            String answer = this.prompt("answer: ", String.class);

            QA qa = new QA(question, answer);
            vdmSet.add(qa);
        }

        Quiz quiz = new Quiz(promo.name, promo.rewards, promo.brand, vdmSet);
        ProgramState.competitions.add(quiz);
        this.println("Created Quiz: " + quiz.toString());

    }

    private void createGiveaway() {
        Promo promo = createPromo();
        if(promo==null)
            return;

        Validator<Integer> percentageValidator = input -> {
            // valid percentage must be between 0 and 100s
            return input >= 0 && input <= 100;
        };

        int winningChances = this.prompt("#quiz questions: ", Integer.class, percentageValidator);

        Giveaway giveaway = new Giveaway(promo.name, promo.rewards, promo.brand, winningChances);

        ProgramState.competitions.add(giveaway);
        this.println("Created Giveaway: " + giveaway.toString());
    }

    private Promo createPromo(){
        String name = this.prompt("name: ", String.class);
        String rewardsIndex = this.prompt("reward ids (separated by , without spaces): ", String.class);
        String[] rewardsIds = rewardsIndex.split(",");
        VDMSet vdmSet = new VDMSet();
        for(String index: rewardsIds){
            if (!Utils.indexInBounds(Integer.getInteger(index), ProgramState.rewards)) {
                return null;
            }
            vdmSet.add(ProgramState.rewards.get(Integer.getInteger(index)));
        }

        int brandIndex = this.prompt("brand id: ", Integer.class);
        if (!Utils.indexInBounds(brandIndex, ProgramState.brands)) {
            return null;
        }

        Brand brand = ProgramState.brands.get(brandIndex);

        return new Promo(name, vdmSet, brand);
    }

    private class Promo{
        String name;
        VDMSet rewards;
        Brand brand;


        Promo(String name, VDMSet rewards, Brand brand) {
            this.name = name;
            this.rewards = rewards;
            this.brand = brand;
        }
    }

    private void stopPromotion() {
        int promotionIndex = this.prompt("promotion id: ", Integer.class);
        Promotion promotion = ProgramState.promotions.get(promotionIndex);
        promotion.setActive(false);
        this.println("Promotion Stopped: " + promotion.toString());
    }

    private void stopCompetition() {
        int competitionIndex = this.prompt("competition id: ", Integer.class);
        Competition competition = ProgramState.competitions.get(competitionIndex);
        competition.setActive(false);
        this.println("Competition Stopped: " + competition.toString());
    }

}
