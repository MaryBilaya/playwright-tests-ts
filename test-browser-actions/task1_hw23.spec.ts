//Task1: Для сайта https://books-pwakit.appspot.com/ найти:
//1. Локатор для строки "Search the world's most comprehensive index of full-text books."
//2. Проверить что текст совпадает с ожидаемым

import { test, expect } from '@playwright/test';

const data = {
    baseURL: "https://books-pwakit.appspot.com/",
};


const locators = {
    searhField: '[aria-label="Search Books"]',
};


test('open URL', 
    {tag: ['@practice'], 
        annotation: {type: 'task', 
        description: `task1: Для сайта https://books-pwakit.appspot.com/ найти:
        1. Локатор для строки "Search the world's most comprehensive index of full-text books."
        2. Проверить что текст совпадает с ожидаемым`}},
        async ({page}) => {
    await page.goto(data.baseURL, {waitUntil: 'load'});
    await expect(page).toHaveURL('https://books-pwakit.appspot.com/');
});

test('fill the search field', async ({page}) => {
    await page.goto(data.baseURL, {waitUntil: 'load'});

    const bookInput = page.locator('book-input-decorator');
    const searchField = bookInput.locator(locators.searhField);
    await expect(searchField).toBeVisible();

    await searchField.fill('Harry Potter');
    await page.keyboard.press('Enter');
    await expect(page.locator('.books')).toBeVisible();
});

test('Check expected text', async ({page}) => {
    await page.goto(data.baseURL, {waitUntil: 'load'});
    const text = page.getByText("Search the world's most comprehensive index of full-text books.");
    await expect(text).toBeVisible();
});