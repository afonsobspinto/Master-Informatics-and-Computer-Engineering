import { browser, by, element } from 'protractor';

export class LoginPage {
    private credentials = {
        email: 'test',
        password: 'test'
    };

    navigateTo() {
        return browser.get('/login');
    }

    fillCredentials(credentias: any = this.credentials) {
        element(by.css('[name="email"]')).sendKeys(this.credentials.email);
        element(by.css('[name="password"]')).sendKeys(this.credentials.password);
        element(by.css('.mat-button')).click();
    }

    getPageTitleText() {
        return element(by.css('title')).getText();
    }

    getErrorMessage() {
        return element(by.css('.alert-danger')).getText();
    }

}
