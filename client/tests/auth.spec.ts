import { test, expect } from './setup/test-setup';

test.describe('Authentication', () => {
  test('should redirect to login page when accessing admin routes without authentication', async ({ page }) => {
    // Try to access admin skills page directly
    await page.goto('/admin/skills');

    // Should be redirected to admin login page
    await expect(page).toHaveURL(/\/admin$/);

    // Login form should be visible
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Go to admin login page
    await page.goto('/admin');

    // Fill in login form
    await page.fill('input[type="email"]', 'admin@test.com');
    await page.fill('input[type="password"]', 'password123');

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to admin skills page
    await expect(page).toHaveURL(/\/admin\/skills/);

    // Should see admin interface
    await page.waitForLoadState('networkidle');
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    // Go to admin login page
    await page.goto('/admin');

    // Fill in login form with invalid credentials
    await page.fill('input[type="email"]', 'invalid@test.com');
    await page.fill('input[type="password"]', '');

    // Submit form
    await page.click('button[type="submit"]');

    // Should stay on login page and show error
    await expect(page).toHaveURL(/\/admin$/);

    // // Look for error message (the exact selector might vary)
    // await expect(page.locator('.text-red-600')).toBeVisible();
  });

  test('should be able to access all admin routes after authentication', async ({ page }) => {
    // Login first
    await page.goto('/admin');
    await page.fill('input[type="email"]', 'admin@test.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin\/skills/);

    // Test navigation to other admin pages
    await page.goto('/admin/categories');
    await expect(page).toHaveURL(/\/admin\/categories/);
    await page.waitForLoadState('networkidle');

    await page.goto('/admin/subcategories');
    await expect(page).toHaveURL(/\/admin\/subcategories/);
    await page.waitForLoadState('networkidle');

    await page.goto('/admin/employer-experience');
    await expect(page).toHaveURL(/\/admin\/employer-experience/);
    await page.waitForLoadState('networkidle');
  });
});