import { test, expect } from '@playwright/test'
import { LoginPage } from "../page_object/login_page.js";
import { InventoryPage } from '../page_object/inventory_page.js';
import { CartPage } from '../page_object/cart_page.js';
import { CheckoutPage } from '../page_object/checkout_page.js';

test.describe('Cart', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page); 
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);


        await loginPage.openLoginPage();
        await loginPage.login('visual_user', 'secret_sauce');
    });

    test('cart contains the added product amount', async () => {
         
        const index = 0;
        const amount = 1;

        await inventoryPage.addProductToCartByIndex(index);
        await inventoryPage.goToCart();

        await cartPage.expectAddedProductsAmountInCart(amount);
    });

    test('proceed to checkout', async () => {

        const index = 1;

        await inventoryPage.addProductToCartByIndex(index);
        await inventoryPage.goToCart();

        await cartPage.expectProductsVisibilityInCart();

        await cartPage.proceedToCheckout();

        await checkoutPage.checkCheckoutTitle();
        
    });

})