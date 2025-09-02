import { Page, expect } from '@playwright/test';

export async function loginAsAdmin(page: Page) {
  // Navigate to admin login page
  await page.goto('/admin');
  
  // Wait for login form to be visible
  await expect(page.locator('form')).toBeVisible({ timeout: 10000 });
  
  // Fill in login credentials (any email/password will work with our mocked API)
  await page.fill('input[type="email"]', 'admin@test.com');
  await page.fill('input[type="password"]', 'password123');
  
  // Submit the form
  await page.click('button[type="submit"]');
  
  // Wait for successful redirect to admin skills page
  await expect(page).toHaveURL(/\/admin\/skills/, { timeout: 15000 });
  
  // Wait a bit more for the page to fully load
  await page.waitForTimeout(2000);
  
  // Verify we're logged in by checking for admin UI elements (sidebar or create button)
  await expect(page.locator('text=Create a New Skill')).toBeVisible({ timeout: 10000 });
}

export async function logoutAdmin(page: Page) {
  // Navigate directly to admin login (simulating logout)
  await page.goto('/admin');
  
  // Wait for login form to be visible (confirming we're logged out)
  await expect(page.locator('form')).toBeVisible({ timeout: 10000 });
}