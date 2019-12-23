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
                Pair.of("Stop Competition", items::stopCompetition),
                Pair.of("Create Coupon", items::createCoupon),
                Pair.of("Create FreeProduct", items::createFreeProduct),
                Pair.of("List Rewards", items::listRewards)
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
        if(promo==null){
            return;
        }

        Promotion promotion = new Promotion(promo.name, promo.rewards , promo.brand);

        ProgramState.promotions.add(promotion);
        this.println("Created promotion: " + promotion.toString());
    }

    private void createQuiz() {
        Promo promo = createPromo();
        if(promo==null){
            return;
        }

        int quizQuestions = this.prompt("#quiz questions: ", Integer.class);
        VDMSet vdmSet = new VDMSet();
        for(int i = 0; i < quizQuestions; i++){
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
        if(promo==null){
            return;
        }

        Validator<Integer> percentageValidator = input -> {
            // valid percentage must be between 0 and 100s
            return input >= 0 && input <= 100;
        };

        int winningChances = this.prompt("Winning Chances (%): ", Integer.class, percentageValidator);

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
            int intIndex;
            try {
                intIndex = Integer.parseInt(index);
            }catch (Exception e){
                System.out.println("Invalid id");
                return null;
            }

            if (!Utils.indexInBounds(intIndex, ProgramState.rewards)) {
                return null;
            }
            vdmSet.add(ProgramState.rewards.get(intIndex));
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
        if (!Utils.indexInBounds(promotionIndex, ProgramState.promotions)) {
            return ;
        }
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

    private void createCoupon() {
        Rwd rwd = createRwd();
        if (rwd==null) {
            return;
        }

        Validator<Integer> percentageValidator = input -> {
            // valid percentage must be between 0 and 100s
            return input >= 0 && input <= 100;
        };

        int discount = this.prompt("discount percentage: ", Integer.class, percentageValidator);

        Coupon coupon = new Coupon(rwd.name, rwd.product, discount);

        ProgramState.rewards.add(coupon);
        this.println("Coupon created: " + coupon.toString());

    }

    private void createFreeProduct() {

        Rwd rwd = createRwd();
        if (rwd==null){
            return;
        }

        FreeProduct freeProduct = new FreeProduct(rwd.name, rwd.product);

        ProgramState.rewards.add(freeProduct);
        this.println("Free Product created: " + freeProduct.toString());
    }

    private Rwd createRwd(){
        String name = this.prompt("name: ", String.class);
        int productIndex = this.prompt("product id: ", Integer.class);
        if (!Utils.indexInBounds(productIndex, ProgramState.products)) {
            return null;
        }

        Product product = ProgramState.products.get(productIndex);

        return new Rwd(name, product);
    }


    private class Rwd{
        String name;
        Product product;


        Rwd(String name, Product product) {
            this.name = name;
            this.product = product;
        }
    }

    private void listRewards() {
        String text = Utils.listOrderedList(ProgramState.rewards);
        this.println(text);
    }



}
