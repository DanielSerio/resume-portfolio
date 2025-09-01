import { authenticatedTest, expect } from './setup/test-setup';

authenticatedTest.describe('Basic Test Setup', () => {
  authenticatedTest('should be able to navigate to admin pages', async ({ page }) => {
    // Simple test to verify our test setup is working
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin\/skills/);
  });
});