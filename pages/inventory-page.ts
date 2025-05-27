import { Page,Locator } from '@playwright/test'

export class InventoryPage {

    readonly page: Page;
    readonly itemDescription: Locator;
    readonly shoppingCart: Locator;
    readonly cartCounter: Locator;

    constructor(page: Page){
        this.page = page;
        this.itemDescription = page.locator('[data-test="inventory-item-description"]');
        this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
        this.cartCounter = page.locator('[data-test="shopping-cart-badge"]');
    };

    async addToCartProductByName(productName: string | RegExp){
        const child = this.page.getByText(productName);
        const parent = this.itemDescription.filter({ has: child });
        await parent.getByRole('button', { name: 'Add to cart' }).click();
    }
}