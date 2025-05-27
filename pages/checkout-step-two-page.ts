import { Locator, Page, expect } from '@playwright/test'

export class CheckoutStepTwoPage {

    readonly page: Page;
    readonly itemPrice: Locator;
    readonly totalPrice: Locator;
    readonly finishButton: Locator;
    readonly taxPercentage: number = 8 / 100;

    constructor(page: Page) {
        this.page = page;
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    //use evaluateAll because is faster TODO
    async expectedTotaItemlPrice(): Promise<number> {
        let total = 0;
        for (const price of await this.itemPrice.all()) {
            total += this.convertToNumber(await price.innerText());
        }
        return total;
    };

    private convertToNumber(text: string): number {
        let num = text.split('$').pop();
        if (!num) {
            throw new Error('There in no number to be converted')
        }
        return parseFloat(num)
    };

    private expectedTax(expectedTotaItemlPrice: number): number {
        return Number((expectedTotaItemlPrice * this.taxPercentage).toFixed(2));
    };

    private expectedTotalPriceWithTaxes(expectedTotaItemlPrice: number, expectedTax: number): number {
        return Number((expectedTotaItemlPrice + expectedTax).toFixed(2));
    };

    async assertTotalPriceIsTheExpected() {
        let expectedTotalItemPrice = await this.expectedTotaItemlPrice();
        let expectedTotalPriceWithTaxes = this.expectedTotalPriceWithTaxes(expectedTotalItemPrice, this.expectedTax(expectedTotalItemPrice))
        expect(this.convertToNumber(await this.totalPrice.innerText())).toBe(expectedTotalPriceWithTaxes);
    };

}