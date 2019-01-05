package mfes;

import mfes.models.*;

import java.util.ArrayList;
import java.util.List;

public class ProgramState {
    public static final List<Product> products = new ArrayList<>(){{add(new Product("Product", "Description",
            new Category("Category"), new Brand("Brand", new Company("Company", "Address", "Email", "Website"))));}};
    public static final List<Category> categories = new ArrayList<>(){{add(new Category("Category"));}};
    public static final List<Company> companies = new ArrayList<>(){{add(new Company("Company", "Address", "Email", "Website"));}};
    public static final List<Brand> brands = new ArrayList<>(){{add(new Brand("Brand", new Company("Company", "Address", "Email", "Website")));}};
    public static final List<User> users = new ArrayList<>();
    public static final List<Review> reviews = new ArrayList<>();
    public static final List<Promotion> promotions = new ArrayList<>();
    public static final List<Competition> competitions = new ArrayList<>();
    public static final List<Reward> rewards = new ArrayList<>();
    public static final List<Award> awards = new ArrayList<>();
    public static final List<Entity> entities = new ArrayList<>();
    public static final List<Retailer> retailers = new ArrayList<>();

    public static User currentuser;
}
