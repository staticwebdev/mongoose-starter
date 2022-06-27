import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('text=Login to see todo items');
  await page.click('a text=Login');
  await expect(page).toHaveURL('/.auth/login.github');
  await page.click('text=Login');
  await expect(page.locator('h4')).toContainText('Select a list');
})