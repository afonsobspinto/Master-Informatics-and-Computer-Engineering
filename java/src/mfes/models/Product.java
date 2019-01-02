package mfes.models;

import java.util.*;
import org.overture.codegen.runtime.*;

@SuppressWarnings("all")
public class Product {
  private String name;
  private String description;
  private Category category;
  private VDMSeq imageUrls;
  private Brand brand;
  private VDMSet reviews;

  public void cg_init_Product_1(
      final String nam, final String desc, final Category cat, final Brand bran) {

    name = nam;
    description = desc;
    category = cat;
    cat.addProduct(this);
    brand = bran;
    brand.addProduct(this);
    imageUrls = SeqUtil.seq();
    reviews = SetUtil.set();
  }

  public Product(final String nam, final String desc, final Category cat, final Brand bran) {

    cg_init_Product_1(nam, desc, cat, bran);
  }

  public String getName() {

    return this.name;
  }

  public String getDescription() {

    return this.description;
  }

  public Category getCategory() {

    return category;
  }

  public void setCategory(final Category cat) {

    category.removeProduct(this);
    category = cat;
    cat.addProduct(this);
  }

  public void setName(final String nam) {

    name = nam;
  }

  public void setDescription(final String desc) {

    description = desc;
  }

  public void setImageUrls(final VDMSeq images) {

    imageUrls = Utils.copy(images);
  }

  public VDMSeq getImageUrls() {

    return Utils.copy(imageUrls);
  }

  public Brand getBrand() {

    return brand;
  }

  public VDMSet getReviews() {

    return Utils.copy(reviews);
  }

  public void addReview(final Review review) {

    reviews = SetUtil.union(Utils.copy(reviews), SetUtil.set(review));
  }

  public Boolean hasReviews() {

    return !(Utils.empty(reviews));
  }

  public Number reviewAverage() {

    Number sum = 0L;
    for (Iterator iterator_1 = reviews.iterator(); iterator_1.hasNext(); ) {
      Review r = (Review) iterator_1.next();
      sum = sum.doubleValue() + Utils.divide((1.0 * r.getRating().longValue()), reviews.size());
    }
    return sum;
  }

  public Product() {}

  public String toString() {

    return "Product{"
        + "name := "
        + Utils.toString(name)
        + ", description := "
        + Utils.toString(description)
        + ", category := "
        + Utils.toString(category)
        + ", imageUrls := "
        + Utils.toString(imageUrls)
        + ", brand := "
        + Utils.toString(brand)
        + ", reviews := "
        + Utils.toString(reviews)
        + "}";
  }
}
