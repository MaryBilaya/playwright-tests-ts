import { test, expect } from '@playwright/test';

//Task 6. Task6: Для сайта https://the-internet.herokuapp.com/upload
// 1. Проверить загрузку файла test.txt (любой файл) на сайт

const data = {
    url: 'https://the-internet.herokuapp.com/upload',
    fileUpload: '#file-upload',
    submitBtn: '#file-submit',
    fileName: 'HW23_UploadFile.txt',
    fileMessage: '#uploaded-files'
    
};

test('Upload file',
    {tag: '@practice', annotation: { type: 'task' }},
    async ({ page }) => {
       await page.goto(data.url);
       const filePath = 'files\\HW23_UploadFile.txt';
       await page.locator(data.fileUpload).setInputFiles(filePath);
       await page.locator(data.submitBtn).click();

       await expect(page.getByRole('heading', {name: 'File Uploaded!'})).toBeVisible();
       await expect(page.locator(data.fileMessage)).toHaveText(data.fileName);

    }
);

