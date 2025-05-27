import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { users } from '../data/userData';
import { pageURLs } from '../utils/page-urls'
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutStepOnePage } from '../pages/checkout-step-one-page';
import { CheckoutStepTwoPage } from '../pages/checkout-step-two-page';
import { CheckoutCompletePage } from '../pages/checkout-complete-page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutStepOnePage: CheckoutStepOnePage;
let checkoutStepTwoPage: CheckoutStepTwoPage;
let checkoutCompletePage: CheckoutCompletePage;

test.beforeEach(async ({ page }) => {
    await page.goto(pageURLs.loginPage);
    loginPage = new LoginPage(page);
    await loginPage.login(users.standardUser);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test.describe('@e2e Order flow Tests', async () => {

    test('should complete an order with a product containing "Red" in the name', async () => {

        //Add product which contains text 'Red' to the cart
        let productNameRegex: RegExp = /Red/;
        await inventoryPage.addToCartProductByName(productNameRegex)

        //Check that cart counter is updated
        await expect(inventoryPage.cartCounter).toHaveText('1');

        //Go to the cart and check that correct product is added
        await inventoryPage.shoppingCart.click();
        await expect(cartPage.productName).toHaveText(productNameRegex);

        //Do checkout and compare total price at the final step
        await cartPage.checkout.click();
        await checkoutStepOnePage.fillCheckoutForm(users.standardUser);
        await checkoutStepOnePage.continueButton.click();
        await checkoutStepTwoPage.assertTotalPriceIsTheExpected();

        //Place the order and check that confirmation page is opened
        await checkoutStepTwoPage.finishButton.click();
        await expect(checkoutCompletePage.page).toHaveURL(pageURLs.checkoutCompletePage);
    })
})
