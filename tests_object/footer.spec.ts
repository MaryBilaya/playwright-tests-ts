import { test, expect } from '@playwright/test'
import { LoginPage } from "../page_object/login_page.js";
import { InventoryPage } from '../page_object/inventory_page.js';
import { FooterPage } from '../page_object/footer_page.js';

test.describe('Footer', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let footerPage: FooterPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page); 
        inventoryPage = new InventoryPage(page);
        footerPage = new FooterPage(page);

        await loginPage.openLoginPage();
        await loginPage.login('visual_user', 'secret_sauce');
    });

    test('footer is displayed', async () => {
        await footerPage.expectFooterVisibility()
    });

    test('correct number of social media icons is displayed', async () => {

        const expectedCount = 3;

        await footerPage.expectSocialMediaSignsCount(expectedCount);
    });
})