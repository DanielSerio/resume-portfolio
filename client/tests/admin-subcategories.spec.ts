import { authenticatedTest as test, expect } from './setup/test-setup';

test.describe('Admin Subcategories CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the admin subcategories page
    await page.goto('/admin/subcategories');

    // Wait for the page to load and MSW to be ready
    await page.waitForLoadState('networkidle');
  });

  test('should display existing subcategories in the list', async ({ page }) => {
    // Check that the subcategories list is visible
    await expect(page.locator('[data-testid="subcategories-list"]')).toBeVisible();
  });

  test('should successfully create a new subcategory with valid data', async ({ page }) => {
    // Click the "Add Subcategory" button
    await page.click('[data-testid="add-subcategory-button"]');

    // Fill in the form
    await page.fill('[data-testid="subcategory-name-input"]', 'Full Stack');

    // Submit the form
    await page.click('[data-testid="save-subcategory-button"]');

    // Wait for the success message
    await expect(page.locator('text=Subcategory created successfully')).toBeVisible();

    // Verify the new subcategory appears in the list
    await expect(page.locator('text=Full Stack')).toBeVisible();
  });

  test('should show validation errors for invalid subcategory data', async ({ page }) => {
    // Click the "Add Subcategory" button
    await page.click('[data-testid="add-subcategory-button"]');

    // Try to submit with empty name
    await page.click('[data-testid="save-subcategory-button"]');

    // Check for validation errors
    await expect(page.locator('text=Name is required')).toBeVisible();
  });

  test('should successfully update an existing subcategory', async ({ page }) => {
    // Click edit button for Frontend subcategory
    await page.click('[data-testid="edit-subcategory-frontend"]');

    // Update the name
    await page.fill('[data-testid="subcategory-name-input"]', 'Frontend Development');

    // Save changes
    await page.click('[data-testid="save-subcategory-button"]');

    // Wait for success message
    await expect(page.locator('text=Subcategory updated successfully')).toBeVisible();

    // Verify changes are reflected
    await expect(page.locator('text=Frontend Development')).toBeVisible();
  });

  test('should successfully delete a subcategory with no relationships', async ({ page }) => {
    // Try to delete Testing subcategory (should have no skills associated)
    await page.click('[data-testid="delete-subcategory-testing"]');

    // Confirm deletion in modal
    await expect(page.locator('text=Are you sure you want to delete this subcategory?')).toBeVisible();
    await page.click('[data-testid="confirm-delete-button"]');

    // Wait for success message
    await expect(page.locator('text=Subcategory deleted successfully')).toBeVisible();

    // Verify subcategory is removed from the list
    await expect(page.locator('text=Testing')).not.toBeVisible();
  });

  test('should show error when trying to delete subcategory with skills', async ({ page }) => {
    // Try to delete Frontend subcategory (has skills associated)
    await page.click('[data-testid="delete-subcategory-frontend"]');

    // Confirm deletion
    await page.click('[data-testid="confirm-delete-button"]');

    // Should show error about relationships
    await expect(page.locator('text=Cannot delete subcategory with existing skills')).toBeVisible();

    // Subcategory should still be visible in the list
    await expect(page.locator('text=Frontend')).toBeVisible();
  });

  test('should filter subcategories by category', async ({ page }) => {
    // Use the category filter
    await page.selectOption('[data-testid="category-filter-select"]', 'frameworks');

    // Should show only framework subcategories
    await expect(page.locator('text=Frontend')).toBeVisible();
    await expect(page.locator('text=Backend')).toBeVisible();
    await expect(page.locator('text=Mobile')).toBeVisible();

    // Should not show tool subcategories
    await expect(page.locator('text=DevOps')).not.toBeVisible();
    await expect(page.locator('text=Testing')).not.toBeVisible();
  });

  test('should search subcategories by name', async ({ page }) => {
    // Use the search input
    await page.fill('[data-testid="subcategories-search-input"]', 'end');

    // Should show Frontend and Backend
    await expect(page.locator('text=Frontend')).toBeVisible();
    await expect(page.locator('text=Backend')).toBeVisible();

    // Should not show other subcategories
    await expect(page.locator('text=Mobile')).not.toBeVisible();
    await expect(page.locator('text=DevOps')).not.toBeVisible();
  });

  test('should show category name for each subcategory', async ({ page }) => {
    // Frontend should show Frameworks as category
    await expect(page.locator('[data-testid="subcategory-frontend-category"]')).toContainText('Frameworks');

    // DevOps should show Tools as category
    await expect(page.locator('[data-testid="subcategory-devops-category"]')).toContainText('Tools');
  });

  test('should handle optimistic updates correctly on create', async ({ page }) => {
    // Click add subcategory
    await page.click('[data-testid="add-subcategory-button"]');

    // Fill form
    await page.fill('[data-testid="subcategory-name-input"]', 'API Development');
    await page.selectOption('[data-testid="subcategory-category-select"]', 'frameworks');

    // Submit form
    await page.click('[data-testid="save-subcategory-button"]');

    // The subcategory should appear immediately (optimistic update)
    await expect(page.locator('text=API Development')).toBeVisible();

    // Then success message should appear
    await expect(page.locator('text=Subcategory created successfully')).toBeVisible();
  });
});