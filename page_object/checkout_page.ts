import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base_page.js';
import { expect } from '@playwright/test'

export class CheckoutPage extends BasePage {
    readonly checkoutTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutTitle = page.locator('[data-test="title"]');
    }

    async checkCheckoutTitle() {
        await expect(this.checkoutTitle).toContainText('Checkout: Your Information');
    }
}