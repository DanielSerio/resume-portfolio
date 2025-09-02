import { Page } from 'playwright/test';
import { authenticatedTest as test, expect } from './setup/test-setup';

test.describe('Admin Categories CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the admin categories page (user is already logged in via authenticatedTest)
    await page.goto('/admin/categories');

    // Wait for the page to load and MSW to be ready
    await page.waitForLoadState('networkidle');
  });

  const getUtility = (page: Page, name: string) => {
    const ID = encodeURIComponent(name);

    const getCreate = () => {
      return async () => {
        await page.click('[data-testid="add-category-button"]');

        // Fill in the form
        await page.fill('[data-testid="category-name-input"]', name);

        // Submit the form
        await page.click('[data-testid="save-category-button"]');

        // Wait for the success message
        await expect(page.locator('text=Category created successfully')).toBeVisible();
      };
    };

    const getDelete = () => {
      return async () => {
        await page.click(`[data-testid="delete-category-${ID}"]`);

        await page.fill('[data-testid="category-delete-input"]', name);

        await page.click('[data-testid="category-delete-button"]');
      };
    };

    return {
      ID,
      getCreate,
      getDelete
    };
  };

  test('should display existing categories in the list', async ({ page }) => {
    // Check that the categories list is visible
    await expect(page.locator('[data-testid="categories-list"]')).toBeVisible();

    // Verify that test categories are displayed
    await expect(page.locator('text="Front-end"')).toBeVisible();
  });

  test('should successfully create a new category with valid data', async ({ page }) => {
    const { getCreate, getDelete } = getUtility(page, 'Create Test');

    const create = getCreate();
    const deleteCategory = getDelete();

    await create();
    await deleteCategory();
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
    const { getCreate, getDelete, ID } = getUtility(page, 'Update Test');
    const create = getCreate();
    const deleteCategory = getDelete();

    await create();

    // Click edit button for the created category
    await page.click(`[data-testid="edit-category-${ID}"]`);

    // Update the name
    await page.fill('[data-testid="category-name-input"]', 'Test Category #2');

    // Save changes
    await page.click('[data-testid="save-category-button"]');

    // Wait for success message
    await expect(page.locator('text=Category updated successfully')).toBeVisible();

    await deleteCategory();
  });

  test('should successfully delete a category with no relationships', async ({ page }) => {
    const { getCreate, getDelete } = getUtility(page, 'Delete Test');

    const create = getCreate();
    const deleteCategory = getDelete();

    await create();
    await deleteCategory();
  });
});