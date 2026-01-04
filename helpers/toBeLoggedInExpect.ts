import { expect as BaseExpect } from '@playwright/test';


const productsPageLocators = {
    productsList: ".inventory_list",
};

export const expect = BaseExpect.extend({
    async toBeLoggedIn (page) {
        try {
            await page.waitForURL('**/inventory.html', { timeout: 10_000 });
            await page.locator(productsPageLocators.productsList).waitFor({ state: 'visible', timeout: 10_000});

            return {pass: true, message: () => 'Login successful'}
        } catch {
            return {pass: false, message: () => 'Login failed. The page "Products" did not load'}
        }
    }
});