import { LoginPage } from './login.po';

describe('protractor-tutorial - Login page', () => {
    let page: LoginPage;

    const wrongCredentias = {
        email: 'email',
        password: 'wrongpasswd'
    };

    beforeEach(() => {
        page = new LoginPage();
    });

    it('when user trying to login with wrong credentials he should stay on “login” page and see error notification', () => {
        page.navigateTo();
        page.fillCredentials(wrongCredentias);
        expect(page.getPageTitleText()).toEqual('Mogplay');
        expect(page.getErrorMessage()).toEqual('You have entered an invalid email or password.Please try again.');
    });

    it('when login is successful — he should redirect to default “public” page', () => {
        page.navigateTo();
        page.fillCredentials();
        expect(page.getPageTitleText()).toEqual('Mogplay');
    });
})
