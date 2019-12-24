"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_po_1 = require("./login.po");
describe('protractor-tutorial - Login page', () => {
    let page;
    const wrongCredentias = {
        email: 'email',
        password: 'wrongpasswd'
    };
    beforeEach(() => {
        page = new login_po_1.LoginPage();
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uZTJlLXNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi5lMmUtc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUF1QztBQUV2QyxRQUFRLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO0lBQzlDLElBQUksSUFBZSxDQUFDO0lBRXBCLE1BQU0sZUFBZSxHQUFHO1FBQ3BCLEtBQUssRUFBRSxPQUFPO1FBQ2QsUUFBUSxFQUFFLGFBQWE7S0FDMUIsQ0FBQztJQUVGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDWixJQUFJLEdBQUcsSUFBSSxvQkFBUyxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNEdBQTRHLEVBQUUsR0FBRyxFQUFFO1FBQ2xILElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7SUFDOUcsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0VBQXdFLEVBQUUsR0FBRyxFQUFFO1FBQzlFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUEifQ==