import { test, expect } from '@playwright/test';

class UserData {
  username: string = 'visual_user';
  incorrectUsername: string = 'visua_user';
  password: string = 'secret_sauce';
  incorrectPassword: string = 'secret_sause';
}

let user: UserData;

test.beforeAll(() => {
  user = new UserData();
});

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/', { waitUntil: 'load' });
});

test('authorization', async ({ page }) => {
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(user.username);

  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(user.password);

  await page.locator('[data-test="login-button"]').click();

  // Expects page to have a title "Products"
  await expect(page.getByText('Products')).toBeVisible();
});

test('authorization with incorrect password', async ({ page }) => {
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(user.username);

  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(user.incorrectPassword);

  await page.locator('[data-test="login-button"]').click();

  // Expects page to have an error message "Epic sadface: Username and password do not match any user in this service"
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('authorization with incorrect username', async ({ page }) => {
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(user.incorrectUsername);

  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(user.password);

  await page.locator('[data-test="login-button"]').click();

  // Expects page to be visible an error message
  await expect(page.locator('[data-test="error"]')).toBeVisible();

  // Expects page to have an error message "Epic sadface: Username and password do not match any user in this service"
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});
