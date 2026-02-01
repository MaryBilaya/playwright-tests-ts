import { test, expect } from '@playwright/test'
import { LoginPage } from "../page_object/login_page.js";
import { InventoryPage } from '../page_object/inventory_page.js';

test.describe('Login', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page); 
        inventoryPage = new InventoryPage(page);

        await loginPage.openLoginPage();
        await loginPage.login('visual_user', 'secret_sauce');
    });

    test('should display products list', async () => {

        await expect(inventoryPage.productList).toBeVisible();

    });

    test('add product to cart', async () => {

        const index = 0;
        const amount = 1;

        await inventoryPage.addProductToCartByIndex(index);
        await inventoryPage.expectCartBadgeCount(amount);
        await inventoryPage.expectButtonRemove(index)

    });
})
