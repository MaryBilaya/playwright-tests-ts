import { test, expect } from '@playwright/test';

//Task 4. Для сайта https://the-internet.herokuapp.com/drag_and_drop
// 1. Перетащить элемент А на элемент В
// 2. Проверить что они поменялись местами

const data = {
    baseUrl: 'https://the-internet.herokuapp.com/drag_and_drop',
    elements: '#columns .column',
    elemA: '[id="column-a"]',
    elemAText: 'A',
    elemB: '[id="column-b"]',
    elemBText: 'B',
};

test('Drag & Drop',
    {tag: '@practice', annotation: { type: 'task' }},
    async ({ page }) => {
        await page.goto(data.baseUrl, {waitUntil: 'load'});
        await expect((page.locator(data.elements)).first()).toHaveText(data.elemAText);

        await page.dragAndDrop(data.elemA, data.elemB);
        await expect((page.locator(data.elements)).first()).toHaveText(data.elemBText);
    }
);