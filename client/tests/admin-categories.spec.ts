import { authenticatedTest as test, expect } from './setup/test-setup';
import { testCategories } from './fixtures';

test.describe('Admin Categories CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the admin categories page (user is already logged in via authenticatedTest)
    await page.goto('/admin/categories');

    // Wait for the page to load and MSW to be ready
    await page.waitForLoadState('networkidle');
  });

  test('should display existing categories in the list', async ({ page }) => {
    // Check that the categories list is visible
    await expect(page.locator('[data-testid="categories-list"]')).toBeVisible();

    // Verify that test categories from fixtures are displayed

    const firstCat = testCategories.at(0);
    const secondCat = testCategories.at(1);

    await expect(page.locator('[data-testid="categories-list"]').locator(`text=${firstCat?.name}`).first()).toBeVisible();
    await expect(page.locator('[data-testid="categories-list"]').locator(`text=${secondCat?.name}`).first()).toBeVisible();
  });

  test('should successfully create a new category with valid data', async ({ page }) => {
    await page.click('[data-testid="add-category-button"]');

    // Fill in the form
    await page.fill('[data-testid="category-name-input"]', 'Test Category');

    // Submit the form
    await page.click('[data-testid="save-category-button"]');

    // Wait for the success message
    await expect(page.locator('text=Category created successfully')).toBeVisible();
  });

  test('should show validation errors for invalid category data', async ({ page }) => {
    // Click the "Add Category" button
    await page.click('[data-testid="add-category-button"]');

    // Try to submit with empty name
    await page.click('[data-testid="save-category-button"]');

    // Check for validation errors
    await expect(page.locator('text=Name is required')).toBeVisible();
  });

  test('should successfully update an existing category', async ({ page }) => {
    const chosenCategory = testCategories.at(1)!;
    // Click edit button for the created category
    await page.click(`[data-testid="edit-category-${chosenCategory.id}"]`);

    // Update the name
    await page.fill('[data-testid="category-name-input"]', 'Test Category #2');

    // Save changes
    await page.click('[data-testid="save-category-button"]');

    // Wait for success message
    await expect(page.locator('text=Category updated successfully')).toBeVisible();
  });

  test('should successfully delete a category with no relationships', async ({ page }) => {
    const chosenCategory = testCategories.at(1)!;
    await page.click(`[data-testid="delete-category-${chosenCategory.id}"]`);

    await page.fill('[data-testid="category-delete-input"]', chosenCategory.name);

    await page.click('[data-testid="category-delete-button"]');
  });
});