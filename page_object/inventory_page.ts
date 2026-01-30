import { BasePage  } from "../page_object/base_page.js";
import type { Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';


export class InventoryPage extends BasePage {
    readonly cartLink: Locator;
    readonly productList: Locator;
    readonly pageTitle: Locator;
    readonly inventoryItems: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.cartLink = page.locator('.shopping_cart_link');
        this.productList = page.locator('.inventory_list');
        this.inventoryItems = page.locator('.inventory_item')
        this.pageTitle = page.getByText('Products');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async openInventoryPage() {
        await this.navigate('https://www.saucedemo.com/inventory.html');
    }

    async goToCart() {
        await this.clickElement(this.cartLink)
    }

    async addProductToCartByIndex(index: number) {
        await this.inventoryItems
        .nth(index)
        .getByRole('button', { name: 'Add to cart' })
        .click();
    }

    async expectCartBadgeCount(amount: number) {
        await expect(this.shoppingCartBadge).toHaveText(String(amount));
    }

    async expectButtonRemove(index: number) {
        await expect(this.inventoryItems
            .nth(index)
            .getByRole('button', { name: 'Remove' }))
            .toBeVisible();
    }
        
}

