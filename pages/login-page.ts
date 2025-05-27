import { expect, Page, Locator } from '@playwright/test'
import { User, availableUsernames, password } from '../data/userData'

export class LoginPage {

    readonly page: Page;
    private readonly pageLogo: string = 'Swag Labs';
    private readonly errorMessages = {
        locked: 'Epic sadface: Sorry, this user has been locked out.',
        notMatched: 'Epic sadface: Username and password do not match any user in this service',
        passwordRequired: 'Epic sadface: Password is required',
        usernameRequired: 'Epic sadface: Username is required'
    } as const;
    private readonly loginCredentialsDiv: Locator;
    private readonly loginPasswordDiv: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly loginErrorDiv: Locator;


    constructor(page: Page) {
        this.page = page;
        this.loginCredentialsDiv = page.locator('[data-test="login-credentials"]');
        this.loginPasswordDiv = page.locator('[data-test="login-password"]');
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.loginErrorDiv = page.locator('.error-message-container.error');
    };

    getErrorMessages(): typeof this.errorMessages {
        return this.errorMessages;
    };

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.pageLogo);
    };

    async assertPageLogo() {
        await expect(this.page.locator('.login_logo')).toHaveText(this.pageLogo);
    };

    async assertUsernamesAreVisible() {
        await expect(this.loginCredentialsDiv).toContainText('Accepted usernames are:');
        for (const [key, username] of Object.entries(availableUsernames)) {
            await expect(this.loginCredentialsDiv).toContainText(username);
        };
    };

    async assertPasswordIsVisible() {
        await expect(this.loginPasswordDiv).toContainText('Password for all users:');
        await expect(this.loginPasswordDiv).toContainText(password.valid);
    };

    async assertUsernameInputHasCorrectAttributes() {
        await expect(this.usernameInput).toBeEmpty();
        await expect(this.usernameInput).toHaveClass('input_error form_input');
        await expect(this.usernameInput).toHaveAttribute('placeholder', 'Username');
        await expect(this.usernameInput).toHaveAttribute('type', 'text');
        await expect(this.usernameInput).toHaveAttribute('id', 'user-name');
        await expect(this.usernameInput).toHaveAttribute('name', 'user-name');
        await expect(this.usernameInput).toHaveAttribute('autocorrect', 'off');
        await expect(this.usernameInput).toHaveAttribute('autocapitalize', 'none');
    };

    async assertPasswordInputHasCorrectAttributes() {
        await expect(this.passwordInput).toBeEmpty();
        await expect(this.passwordInput).toHaveClass('input_error form_input');
        await expect(this.passwordInput).toHaveAttribute('placeholder', 'Password');
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
        await expect(this.passwordInput).toHaveAttribute('id', 'password');
        await expect(this.passwordInput).toHaveAttribute('name', 'password');
        await expect(this.passwordInput).toHaveAttribute('autocorrect', 'off');
        await expect(this.passwordInput).toHaveAttribute('autocapitalize', 'none');
    };

    async assertLoginButtonHasCorrectAttributes() {
        await expect(this.loginButton).toBeEnabled();
        await expect(this.loginButton).toHaveAttribute('type', 'submit');
        await expect(this.loginButton).toHaveClass('submit-button btn_action');
        await expect(this.loginButton).toHaveAttribute('id', 'login-button');
        await expect(this.loginButton).toHaveAttribute('name', 'login-button');
        await expect(this.loginButton).toHaveAttribute('value', 'Login');
    };

    async assertLoginPassWithAllUsernames() {
        for (const [key, username] of Object.entries(availableUsernames)) {
            if (username !== availableUsernames.locked) {
                await this.login({ username: username, password: password.valid });
                await this.Logout();
            };
        };
    };

    async assertLoginFailWithError(user: User, message: string) {
        await this.login(user);
        await expect(this.loginErrorDiv).toBeVisible();
        await expect(this.loginErrorDiv).toContainText(message);
        await expect(this.page.locator('[data-test="error-button"]')).toBeEnabled();
    };


    async login(user: User) {
        await this.usernameInput.fill(user.username);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
    };

    async Logout() {
        await this.page.locator('#react-burger-menu-btn').click();
        await this.page.locator('[data-test="logout-sidebar-link"]').click();
    };
};