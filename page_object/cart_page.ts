import { BasePage } from "../page_object/base_page.js";
import type { Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
        // readonly cartItemList: Locator;
        readonly checkoutButton: Locator;
        readonly cartItems: Locator;

    constructor(page: Page) {
        super(page);
        // this.cartItemList = page.locator('.cart_list');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async openCartPage() {
        this.navigate('https://www.saucedemo.com/cart.html');
    }

    async expectAddedProductsAmountInCart(amount: number) {
        await expect(this.cartItems).toHaveCount(amount);
    }

    async expectProductsVisibilityInCart() {
        await expect(this.cartItems).toBeVisible();
    }

    async proceedToCheckout() {
        await this.clickElement(this.checkoutButton)
    }

}