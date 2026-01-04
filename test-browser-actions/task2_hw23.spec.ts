//Task2: Для сайта https://the-internet.herokuapp.com/windows
//1. Открыть новую страницу
//2. Проверить что она открылась и имеет ожидаемый ЮРЛ и тайтл 

import { test, expect } from '@playwright/test';

const data = {
    baseUrl: "https://the-internet.herokuapp.com/windows",
    expectedUrl: "https://the-internet.herokuapp.com/windows/new",
    expectedTitle: "New Window",
};

test('Checking of opening a new window',
    {tag: ['@practice'], 
        annotation: {type: 'task', 
        description: `task2: Для сайта https://the-internet.herokuapp.com/windows
        1. Открыть новую страницу
        2. Проверить что она открылась и имеет ожидаемый ЮРЛ и тайтл`}},
         async ({page}) => {
    await page.goto(data.baseUrl, {waitUntil: 'load'});

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByRole('link', {name: 'Click Here'}).click(),
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage).toHaveURL(data.expectedUrl);
    await expect(newPage).toHaveTitle(data.expectedTitle);

    await newPage.close();
    expect(page.context().pages().length).toBe(1);
});