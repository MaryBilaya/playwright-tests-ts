import type { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        if (url) {
            await this.page.goto(url, {waitUntil: 'load'});
        }
    }

    async clickElement(element: Locator) {
        await element.click();
    }

    async fillInput(element: Locator, text: string) {
        await element.fill(text);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getText(element: Locator) {
        return await element.textContent() || '';
    }

    async isVisible(element: Locator) {
        return await element.isVisible();
    }
}