import { Page } from 'playwright/test';
import { authenticatedTest as test, expect } from './setup/test-setup';

test.describe('Admin Subcategories CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the admin subcategories page
    await page.goto('/admin/subcategories');

    // Wait for the page to load and MSW to be ready
    await page.waitForLoadState('networkidle');
  });



  const getUtility = (page: Page, name: string) => {
    const ID = encodeURIComponent(name);

    const getCreate = () => {
      return async () => {
        await page.click('[data-testid="add-subcategory-button"]');

        // Fill in the form
        await page.fill('[data-testid="subcategory-name-input"]', name);

        // Submit the form
        await page.click('[data-testid="save-subcategory-button"]');

        // Wait for the success message
        await expect(page.locator('text=Subcategory created successfully')).toBeVisible();
      };
    };

    const getDelete = () => {
      return async () => {
        await page.click(`[data-testid="delete-subcategory-${ID}"]`);

        await page.fill('[data-testid="subcategory-delete-input"]', name);

        await page.click('[data-testid="subcategory-delete-button"]');
      };
    };

    return {
      ID,
      getCreate,
      getDelete
    };
  };

  test('should display existing subcategories in the list', async ({ page }) => {
    // Check that the subcategories list is visible
    await expect(page.locator('[data-testid="subcategories-list"]')).toBeVisible();
  });

  test('should successfully create a new subcategory with valid data', async ({ page }) => {
    const { getCreate, getDelete } = getUtility(page, 'Create Test');

    const create = getCreate();
    const deleteSubcategory = getDelete();

    await create();
    await deleteSubcategory();
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
    const { getCreate, getDelete, ID } = getUtility(page, 'Update Test');
    const create = getCreate();
    const deleteSubcategory = getDelete();

    await create();

    // Click edit button for Full Stack subcategory
    await page.click(`[data-testid="edit-subcategory-${ID}"]`);

    // Update the name
    await page.fill('[data-testid="subcategory-name-input"]', 'Test Subcategory #2');

    // Save changes
    await page.click('[data-testid="save-subcategory-button"]');

    // Wait for success message
    await expect(page.locator('text=Subcategory updated successfully')).toBeVisible();

    await deleteSubcategory();
  });

  test('should successfully delete a subcategory with no relationships', async ({ page }) => {
    const { getCreate, getDelete } = getUtility(page, 'Delete Test');

    const create = getCreate();
    const deleteSubcategory = getDelete();

    await create();
    await deleteSubcategory();
  });
});