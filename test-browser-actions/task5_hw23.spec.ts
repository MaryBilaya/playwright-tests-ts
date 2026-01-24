import { test, expect } from '@playwright/test';

//Task 5. Task5: Для сайта https://the-internet.herokuapp.com/key_presses
// 1. Проверить нажатие клавиши "Control"
// 2. Проверить что отображается последняя буква вашего имени после ввода через клавиатуру

const data = {
    url: 'https://the-internet.herokuapp.com/key_presses',
    inputField: '#target',
    name: 'maryia',
    result: '#result',
    checkControlKeyboard: 'Control',
}

test('Task5',
    {tag: '@practice hw_23', annotation: { type: 'task' }},
    async ({ page }) => {
        await page.goto(data.url, {waitUntil: 'load'});

        await page.keyboard.press(data.checkControlKeyboard);
        await expect(page.locator(data.result)).toHaveText(`You entered: ${data.checkControlKeyboard.toUpperCase()}`);

        await page.keyboard.type(data.name);
        // await page.locator(data.inputField).fill(data.name);

        const lastDigitName = data.name.at(-1)?.toUpperCase();

        await expect(page.locator(data.result)).toHaveText(`You entered: ${lastDigitName}`);
    }
);