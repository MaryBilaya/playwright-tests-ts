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
    });

    test('login with valid credentials', async ({ page }) => {

        const validUsername = 'visual_user';
        const validPassword = 'secret_sauce';

        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await loginPage.login(validUsername, validPassword);

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.pageTitle).toBeVisible();
 
    })

    test('error message with invalid credentials', async ({ page }) => {

        const validUsername = 'visual_user';
        const inValidPassword = 'secret_source';
        const errorMessageText = 'Epic sadface: Username and password do not match any user in this service';

        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await loginPage.login(validUsername, inValidPassword);

        await expect(loginPage.errorMessage).toContainText(errorMessageText);
    })
})