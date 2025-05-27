import { Page,Locator } from '@playwright/test'

export class CartPage {

    readonly page: Page;
    readonly productName: Locator;
    readonly checkout: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;

    constructor(page: Page){
        this.page = page;
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.checkout = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
    };

}