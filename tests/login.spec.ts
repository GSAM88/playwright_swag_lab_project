import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { pageURLs } from '../utils/page-urls';
import { users } from '../data/userData.ts';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    await page.goto(pageURLs.loginPage);
    loginPage = new LoginPage(page);
});

test.afterEach(async ({ page }) => {
    await page.close();
});


test.describe('@smoke Login Webpage UI Tests', async () => {

    test('should display the correct page title', async () => {
        await loginPage.assertPageTitle();
    });

    test('should display the company logo on the login page', async () => {
        await loginPage.assertPageLogo();
    });

    test('should display the list of available usernames', async () => {
        await loginPage.assertUsernamesAreVisible();
    });

    test('should display the password for all users', async () => {
        await loginPage.assertPasswordIsVisible();
    });
});

test.describe('@smoke Login Form UI Tests', async () => {

    test('should have correct attributes on the username input', async () => {
        await loginPage.assertUsernameInputHasCorrectAttributes();
    });

    test('should have correct attributes on the password input', async () => {
        await loginPage.assertPasswordInputHasCorrectAttributes();
    });

    test('should have correct attributes on the login button', async () => {
        await loginPage.assertLoginButtonHasCorrectAttributes();
    });

});

test.describe('@functional Login Form Functional tests', async ()=>{

    test('should login successfully with all registered usernames', async ()=>{
        await loginPage.assertLoginPassWithAllUsernames();
    });

    test('should display an error for locked user login', async ()=>{
        await loginPage.assertLoginFailWithError(users.locked,loginPage.getErrorMessages().locked);
    });

    test('should display an error for invalid username', async ()=>{
        await loginPage.assertLoginFailWithError(users.unregistered, loginPage.getErrorMessages().notMatched);
    });

    test('should display an error for invalid password', async ()=>{
        await loginPage.assertLoginFailWithError(users.invalidPassword, loginPage.getErrorMessages().notMatched);
    });

    test('should display an error for empty Username', async ()=>{
        await loginPage.assertLoginFailWithError(users.emptyUsername, loginPage.getErrorMessages().usernameRequired);
    });

    test('should display an error for empty Password', async ()=>{
        await loginPage.assertLoginFailWithError(users.emptyPassword, loginPage.getErrorMessages().passwordRequired);
    });

    test('should display an error when username and password are in uppercase', async ()=>{
        await loginPage.assertLoginFailWithError(users.upperCase, loginPage.getErrorMessages().notMatched);
    });

})