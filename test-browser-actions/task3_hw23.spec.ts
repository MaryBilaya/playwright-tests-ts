//Task3: Для сайта https://the-internet.herokuapp.com/hovers
//1. С помощью указателя мыши навестись на любую из картинок
//2. Проверить, что ожидаемый текст под картинкой появился

import { test, expect } from '@playwright/test';

const data = {
    baseUrl: "https://the-internet.herokuapp.com/hovers",
    expectedText: "name: user1",
};

const loc = {
    profileCard: ".figure",
}

test('Work with mouse imitation', 
    {tag: ['@practice'], 
        annotation: {type: 'task', 
        description: `task3: Для сайта https://the-internet.herokuapp.com/hovers
        1. С помощью указателя мыши навестись на любую из картинок
        2. Проверить, что ожидаемый текст под картинкой появился`}}, 
    async ({page})=> {

    await page.goto(data.baseUrl, {waitUntil: 'load'});
    
    const firstCard = page.locator(loc.profileCard).first();
    await firstCard.hover();

    const visibleText = firstCard.locator('h5');
    await expect(visibleText).toBeVisible();
    await expect(visibleText).toHaveText(data.expectedText);
});

