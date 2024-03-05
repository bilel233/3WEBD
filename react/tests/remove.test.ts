import { test} from '@playwright/test';

test('remove a book from a list', async ({ page }) => {

    await page.goto('http://localhost:5173/ListPage');
   // await page.click('button:has-text("Supprimer")');


});
