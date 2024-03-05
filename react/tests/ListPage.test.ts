import { test, expect } from '@playwright/test';

test.describe('List management', () => {
    test('should add a book to a list and remove it', async ({ page }) => {
        await page.goto('http://localhost:5173/ListPage');
        await page.waitForSelector('useSelector', { state: 'visible' });
        await page.click('useSelector');
        await page.waitForSelector('useSelector', { state: 'attached' });
        await expect(page.locator('useSelector')).toBeVisible();

    });
});
