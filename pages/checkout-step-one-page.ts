import { Page, Locator } from '@playwright/test'
import { User } from '../data/userData';

export class CheckoutStepOnePage {

    readonly page: Page;
    readonly continueButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.locator('[data-test="continue"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
    };

    async fillCheckoutForm(user: User) {
        if (!user.firstName || !user.lastName || !user.postalCode){
            throw new Error('Missing required fields in user data');
        }
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.postalCodeInput.fill(user.postalCode);
    };

}