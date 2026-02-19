import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  // Replace with your test URL
  await page.goto('https://example.com');
  
  // Check page title
  await expect(page).toHaveTitle(/Example/);
});
