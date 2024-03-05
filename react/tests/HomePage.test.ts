import { test, expect } from '@playwright/test';

test.describe('HomePage tests', () => {
    test('should display the loading state and then the list of recent changes', async ({ page }) => {
        await page.goto('http://localhost:5173');
        await expect(page.locator('text=Loading...')).toBeVisible();
        const listItem = page.locator('.item');
        await expect(listItem).toHaveCount(10);

    });
});
