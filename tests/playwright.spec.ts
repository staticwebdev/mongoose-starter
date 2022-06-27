import { test, expect } from '@playwright/test';

test('login from home page', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('text=Login to see todo items');
  await page.click('a:has-text("Login")');
  await expect(page).toHaveURL('/.auth/login/github');
  await page.click('text=Login');
  await page.waitForSelector('span');
  await expect(page.locator('span')).toContainText('Welcome');
})