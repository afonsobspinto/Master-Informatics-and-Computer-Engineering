package mfes.cli.methods;

import mfes.ProgramState;
import mfes.cli.SimplifiedAction;
import mfes.models.Brand;
import mfes.models.Category;
import mfes.models.Product;

import java.util.stream.Collectors;

public class Products extends SimplifiedAction {


    public void listProducts() {
        String text = ProgramState.products.stream()
                .map(Product::toString)
                .collect(Collectors.joining("\n\n"));
        this.println(text);
    }

    public void registerNewProduct() {
        String name = this.prompt("name: ", String.class);
        String description = this.prompt("description: ", String.class);
        Product product = new Product(name, description, new Category("aw"), new Brand());
        ProgramState.products.add(product);

        this.println("created new product: " + product.toString());
    }
}
