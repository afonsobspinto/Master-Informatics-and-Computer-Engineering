"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class LoginPage {
    constructor() {
        this.credentials = {
            email: 'test',
            password: 'test'
        };
    }
    navigateTo() {
        return protractor_1.browser.get('/login');
    }
    fillCredentials(credentias = this.credentials) {
        protractor_1.element(protractor_1.by.css('[name="email"]')).sendKeys(this.credentials.email);
        protractor_1.element(protractor_1.by.css('[name="password"]')).sendKeys(this.credentials.password);
        protractor_1.element(protractor_1.by.css('.mat-button')).click();
    }
    getPageTitleText() {
        return protractor_1.element(protractor_1.by.css('title')).getText();
    }
    getErrorMessage() {
        return protractor_1.element(protractor_1.by.css('.alert-danger')).getText();
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ucG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi5wby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFrRDtBQUVsRCxNQUFhLFNBQVM7SUFBdEI7UUFDWSxnQkFBVyxHQUFHO1lBQ2xCLEtBQUssRUFBRSxNQUFNO1lBQ2IsUUFBUSxFQUFFLE1BQU07U0FDbkIsQ0FBQztJQW9CTixDQUFDO0lBbEJHLFVBQVU7UUFDTixPQUFPLG9CQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxlQUFlLENBQUMsYUFBa0IsSUFBSSxDQUFDLFdBQVc7UUFDOUMsb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRSxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pFLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCxlQUFlO1FBQ1gsT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0NBRUo7QUF4QkQsOEJBd0JDIn0=