import { test } from '@playwright/test'; 
import { expect } from '../helpers/toBeLoggedInExpect.js'


const data = {
    baseUrl: "https://www.saucedemo.com/",
    username: "visual_user",
    correctPassword: "secret_sauce",
    incorrectPassword: "secretsause"
};


const authPageLocators = {
    usernameField: '[data-test="username"]',
    passwordField: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
};


const productsPageLocators = {
    menuButton: '//button[text()="Open Menu"]',
}


test.beforeEach(async ({page}) => {
    await page.goto(data.baseUrl, { waitUntil: 'load'});
});


test.describe('Authorization', () => {
    test('authorization with correct password', 
        {tag: ['@auth', '@smoke'], annotation: {type: 'testcase', description: 'https://....'}}, 
        async ({page, context}, testInfo) => {
        //start tracing
        await context.tracing.start({
            screenshots: true, 
            snapshots: true,
        });

        await page.locator(authPageLocators.usernameField).fill(data.username);
        await page.locator(authPageLocators.passwordField).fill(data.correctPassword);
        await page.locator(authPageLocators.loginButton).click();

        await expect(page).toBeLoggedIn();
       
        if (testInfo.status !== testInfo.expectedStatus) {
            await context.tracing.stop({
                path: testInfo.outputPath(`trace-${testInfo.title}.zip`),
            });
        } else {
            //stop tracing
            await context.tracing.stop();
        }
    });

    test('authorization with incorrect password', 
        {tag: ['@auth', '@sanity', '@negative'], annotation: {type: 'testcase', description: 'https://....'}}, 
        async ({page}) => {
            await page.locator(authPageLocators.usernameField).fill(data.username);
            await page.locator(authPageLocators.passwordField).fill(data.incorrectPassword);
            await page.locator(authPageLocators.loginButton).click();

            await expect(page.locator(authPageLocators.errorMessage)).toContainText("Epic sadface: Username and password do not match any user in this service");
            await expect(page).toHaveScreenshot();
    });
});  
