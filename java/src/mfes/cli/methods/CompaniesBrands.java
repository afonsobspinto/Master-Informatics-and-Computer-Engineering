package mfes.cli.methods;

import io.bretty.console.view.MenuView;
import mfes.Pair;
import mfes.ProgramState;
import mfes.cli.SimplifiedAction;
import mfes.cli.Utils;
import mfes.models.Brand;
import mfes.models.Company;
import mfes.models.Retailer;

public class CompaniesBrands extends SimplifiedAction {
  public static MenuView buildMenu() {
    CompaniesBrands items = new CompaniesBrands();
    return Utils.buildMenuView(
        "Companies, Brands, Retailers CRUD",
        Pair.of("List companies", items::listCompanies),
        Pair.of("Create company", items::createCompany),
        Pair.of("Delete company", items::deleteCompany),
        Pair.of("List brands", items::listBrands),
        Pair.of("Create brand", items::createBrand),
        Pair.of("Delete brand", items::deleteBrand),
        Pair.of("List retailers", items::listRetailers),
        Pair.of("Create retailer", items::createRetailer),
        Pair.of("Delete retailer", items::deleteRetailer));
  }

  private void createCompany() {
    String name = this.prompt("name: ", String.class);
    String address = this.prompt("address: ", String.class);
    String email = this.prompt("email: ", String.class);
    String website = this.prompt("website: ", String.class);

    Company company = new Company(name, address, email, website);
    ProgramState.companies.add(company);
    this.println("Created company: " + company.toString());
  }

  private void listCompanies() {
    String text = Utils.listOrderedList(ProgramState.companies);
    this.println(text);
  }

  private void deleteCompany() {
    int companyIndex = this.prompt("company id: ", Integer.class);

    if (!Utils.indexInBounds(companyIndex, ProgramState.companies)) {
      return;
    }

    ProgramState.companies.remove(companyIndex);
    this.println("Removed company");
  }

  private void createBrand() {
    String name = this.prompt("name: ", String.class);
    int companyIndex = this.prompt("company id: ", Integer.class);

    if (!Utils.indexInBounds(companyIndex, ProgramState.companies)) {
      return;
    }

    Company company = ProgramState.companies.get(companyIndex);
    Brand brand = new Brand(name, company);

    ProgramState.brands.add(brand);
    this.println("Created brand: " + brand.toString());
  }

  private void listBrands() {
    String text = Utils.listOrderedList(ProgramState.brands);
    this.println(text);
  }

  private void deleteBrand() {
    int brandIndex = this.prompt("brand id: ", Integer.class);

    if (!Utils.indexInBounds(brandIndex, ProgramState.brands)) {
      return;
    }

    ProgramState.brands.remove(brandIndex);
    this.println("Removed brand");
  }

  private void createRetailer() {
    String name = this.prompt("name: ", String.class);

    Retailer retailer = new Retailer(name);
    ProgramState.retailers.add(retailer);
    this.println("Created retailer: " + retailer.toString());
  }

  private void listRetailers() {
    String text = Utils.listOrderedList(ProgramState.retailers);
    this.println(text);
  }

  private void deleteRetailer() {
    int retailerIndex = this.prompt("retailer id: ", Integer.class);

    if (!Utils.indexInBounds(retailerIndex, ProgramState.retailers)) {
      return;
    }

    ProgramState.retailers.remove(retailerIndex);
    this.println("Removed retailer");
  }
}
