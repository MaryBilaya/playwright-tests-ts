import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base_page.js';
import { expect } from '@playwright/test'

export class FooterPage extends BasePage {
    readonly socialMediaSigns: Locator;
    readonly footer: Locator;

    constructor(page: Page) {
        super(page);
        this.socialMediaSigns = page.locator('ul.social li');
        this.footer = page.locator('.footer');
    }


    async expectFooterVisibility() {
        await expect(this.footer).toBeVisible();
    }

    async getSocialMediaSigns() {
        return await this.socialMediaSigns.count()
    }

    async expectSocialMediaSignsCount(expectedCount: number) {
        await expect(this.socialMediaSigns).toHaveCount(expectedCount);
    }
}