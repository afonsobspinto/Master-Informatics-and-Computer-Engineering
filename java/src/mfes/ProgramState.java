package mfes;

import mfes.models.Brand;
import mfes.models.Category;
import mfes.models.Company;
import mfes.models.Product;

import java.util.ArrayList;
import java.util.List;

public class ProgramState {
    public static final List<Product> products = new ArrayList<>();
    public static final List<Category> categories = new ArrayList<>();
    public static final List<Company> companies = new ArrayList<>();
    public static final List<Brand> brands = new ArrayList<>();
}
