package mfes.cli.methods;

import io.bretty.console.view.MenuView;
import mfes.Pair;
import mfes.ProgramState;
import mfes.cli.SimplifiedAction;
import mfes.cli.Utils;
import mfes.models.Brand;
import mfes.models.Company;

public class CompaniesBrands extends SimplifiedAction {
  public static MenuView buildMenu() {
    CompaniesBrands items = new CompaniesBrands();
    return Utils.buildMenuView(
        "Companies, Brands CRUD",
        Pair.of("List companies", items::listCompanies),
        Pair.of("Create company", items::createCompany),
        Pair.of("Delete company", items::deleteCompany),
        Pair.of("List brands", items::listBrands),
        Pair.of("Create brand", items::createBrand),
        Pair.of("Delete brand", items::deleteBrand));
  }

  public void createCompany() {
    String name = this.prompt("name: ", String.class);
    String address = this.prompt("address: ", String.class);
    String email = this.prompt("email: ", String.class);
    String website = this.prompt("website: ", String.class);

    Company company = new Company(name, address, email, website);
    ProgramState.companies.add(company);
    this.println("Created company: " + company.toString());
  }

  public void listCompanies() {
    String text = Utils.listOrderedList(ProgramState.companies);
    this.println(text);
  }

  public void deleteCompany() {
    int companyIndex = this.prompt("company id: ", Integer.class);

    if (!Utils.indexInBounds(companyIndex, ProgramState.companies)) {
      return;
    }

    ProgramState.companies.remove(companyIndex);
    this.println("Removed company");
  }

  public void createBrand() {
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

  public void listBrands() {
    String text = Utils.listOrderedList(ProgramState.brands);
    this.println(text);
  }

  public void deleteBrand() {
    int brandIndex = this.prompt("brand id: ", Integer.class);

    if (!Utils.indexInBounds(brandIndex, ProgramState.brands)) {
      return;
    }

    ProgramState.brands.remove(brandIndex);
    this.println("Removed brand");
  }
}
