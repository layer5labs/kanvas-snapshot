//@ts-check
import { test, expect } from '@playwright/test';
import { doInitialSetup } from '../helpers/playwrightSetup';

test('Login Test', async () => {
  // Initialize the browser, context, and page
  const { browser, context, page } = await doInitialSetup();

  await page.goto('https://meshery.layer5.io/login');
  await page.locator('input[name="identifier"]').fill('test-admin@layer5.io');

  // Press the Tab key (to move to the password field)
  await page.locator('input[name="identifier"]').press('Tab');
  await page.locator('input[name="password"]').fill('test-admin');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  // Click other buttons or perform actions as needed
  await page.getByRole('banner').locator('button').click();
  await page.locator('#simple-popover > .MuiBackdrop-root').click();
  await page.getByRole('banner').locator('button').click();
  await page.getByText('Logout').click();

  // Wait for some time (e.g., 5 seconds) to ensure the page interactions are complete
  await page.waitForTimeout(5000);

  await browser.close();
});
