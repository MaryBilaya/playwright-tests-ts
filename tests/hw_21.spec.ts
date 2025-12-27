import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

class Data {
  baseUrl: string = 'https://www.saucedemo.com/';
  username: string = 'visual_user';
  password: string = 'secret_sauce';
}

class Locators {
  usernameField: string = '[data-test="username"]';
  passwordField: string = '[data-test="password"]';
  loginButton: string = '[id="login-button"]';
  titleProductsPage: string = '[data-test="title"]';
  menuButton: string = '//button[text()="Open Menu"]';
  listOfPrice: string = '[data-test="inventory-item-price"]';
  productCards: string = '.inventory_item';
  shoppingCartBadge: string = '[data-test="shopping-cart-badge"]';
  filtering: string = '[data-test="product-sort-container"]';
  logout: string = '[id="logout_sidebar_link"]';
  optionHighToLow: string = '[data-test="active-option"]';
}

let data: Data;
let loc: Locators;

test.beforeAll(() => {
  data = new Data();
  loc = new Locators();
});

async function login(page: Page) {
  await page.goto(data.baseUrl, { waitUntil: 'load' });

  await page.locator(loc.usernameField).click();
  await page.locator(loc.usernameField).fill(data.username);

  await page.locator(loc.passwordField).click();
  await page.locator(loc.passwordField).fill(data.password);

  await page.locator(loc.loginButton).click();
}

test('URL verification', async ({ page }) => {
  await page.goto(data.baseUrl, { waitUntil: 'load' });

  // Expects to navigate to https://www.saucedemo.com/
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('Authorization', async ({ page }) => {
  //Login in to the app
  await login(page);

  // Expects to navigate to https://www.saucedemo.com/inventory.html
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); //падал тест, поэтом разные варианты пробовала

  // Expects page to have a menu button
  await expect(page.locator(loc.menuButton)).toBeVisible(); //падал тест, поэтом разные варианты пробовала

  // Expects page to have a title "Products"
  await expect(page.getByText('Products')).toBeVisible(); //падал тест, поэтом разные варианты пробовала

  // Expects page to have a title "Products"
  await expect(page.locator(loc.titleProductsPage)).toHaveText('Products'); //падал тест, поэтом разные варианты пробовала
});

test('Addition to cart: cheaper product', async ({ page }) => {
  //Login in to the app
  await login(page);

  const priceLocators = page.locator(loc.listOfPrice); //находим все элементы с ценами
  const count = await priceLocators.count(); //считаем их количество = 6

  type Prices = { index: number; price: number };
  const prices: Prices[] = [];

  for (let i = 0; i < count; i++) {
    const text = (await priceLocators.nth(i).textContent()) ?? ''; //получаем текст цены каждого элемента из 6
    const numberPrice = Number(text.replace('$', '')); //преобразуем данные в число и удаляем $
    prices.push({ index: i, price: numberPrice }); //формируем массив объектов
  }

  prices.sort((a, b) => a.price - b.price);
  const cheapestIndex = prices[0]?.index;
  if (cheapestIndex === undefined) throw Error('No products found');

  const cheapestCard = page.locator(loc.productCards).nth(cheapestIndex);
  const addToCartButton = cheapestCard.getByRole('button', { name: 'Add to cart' });
  await addToCartButton.click();

  await expect(page.locator(loc.shoppingCartBadge)).toHaveText('1');
  await expect(cheapestCard.getByRole('button', { name: 'Remove' })).toBeVisible();
});

test('Filtering: high to low', async ({ page }) => {
  //Login in to the app
  await login(page);

  await page.locator(loc.filtering).selectOption('hilo');

  await expect(page.locator(loc.optionHighToLow).getByText('Price (high to low)')).toBeVisible();

  //Убрала, т.к. у меня на Windows некорректно работала функция фильтрации.

  // const priceLocators = page.locator(loc.listOfPrice);
  // const count = await priceLocators.count();

  // type Prices = {index: number, price: number};
  // const prices: Prices[] = [];

  // for(let i = 0; i < count; i++) {
  // const text = await priceLocators.nth(i).textContent() ?? "";    //получаем текст цены каждого элемента из 6
  // const numberPrice = Number(text.replace('$', ''));              //преобразуем данные в число и удаляем $
  // prices.push({index: i, price: numberPrice});                    //формируем массив объектов
  // };

  // const priceValues = prices.map(p => p.price);

  // const sortDesc = structuredClone(priceValues).sort((a, b) => b - a);

  // expect(priceValues).toEqual(sortDesc);
});

test('Logout', async ({ page }) => {
  //Login in to the app
  await login(page);

  await page.locator(loc.menuButton).click();
  await page.locator(loc.logout).click();

  await expect(page.locator(loc.usernameField)).toBeVisible();
});
