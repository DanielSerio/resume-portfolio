import { Page } from 'playwright/test';
import { authenticatedTest as test, expect } from './setup/test-setup';

test.describe('Admin Employer Experience CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the admin employer experience page
    await page.goto('/admin/employer-experiences');

    // Wait for the page to load and MSW to be ready
    await page.waitForLoadState('networkidle');
  });

  const getUtility = (page: Page, name: string) => {
    const ID = encodeURIComponent(name);

    const getCreate = () => {
      return async () => {
        await page.click('[data-testid="add-employer-experience-button"]');

        // Fill in the form (only name field based on simplified schema)
        await page.fill('[data-testid="employer-name-input"]', name);

        // Submit the form
        await page.click('[data-testid="save-employer-experience-button"]');

        // Wait for the success message
        await expect(page.locator('text=Employer experience created successfully')).toBeVisible();
      };
    };

    const getDelete = () => {
      return async () => {
        await page.click(`[data-testid="delete-employer-experience-${ID}"]`);

        await page.fill('[data-testid="employer-experience-delete-input"]', name);

        await page.click('[data-testid="employer-experience-delete-button"]');
      };
    };

    return {
      ID,
      getCreate,
      getDelete
    };
  };

  test('should display existing employer experiences in the list', async ({ page }) => {
    // Check that the employer experiences list is visible
    await expect(page.locator('[data-testid="employer-experiences-list"]')).toBeVisible();

    // Verify that test employer experiences are displayed
    await expect(page.locator('text=Accumedix, Inc')).toBeVisible();
  });

  test('should successfully create a new employer experience with valid data', async ({ page }) => {
    const { getCreate, getDelete } = getUtility(page, 'Create Test');

    const create = getCreate();
    const deleteEmployerExperience = getDelete();

    await create();
    await deleteEmployerExperience();
  });

  test('should show validation errors for invalid employer experience data', async ({ page }) => {
    // Click the "Add Employer Experience" button
    await page.click('[data-testid="add-employer-experience-button"]');

    // Try to submit with empty name
    await page.click('[data-testid="save-employer-experience-button"]');

    // Check for validation errors
    await expect(page.locator('text=Name is required')).toBeVisible();
  });

  test('should successfully update an existing employer experience', async ({ page }) => {
    const { getCreate, getDelete, ID } = getUtility(page, 'Update Test');
    const create = getCreate();
    const deleteEmployerExperience = getDelete();

    await create();

    // Click edit button for the created employer experience
    await page.click(`[data-testid="edit-employer-experience-${ID}"]`);

    // Update the name
    await page.fill('[data-testid="employer-name-input"]', 'Test Employer Experience #2');

    // Save changes
    await page.click('[data-testid="save-employer-experience-button"]');

    // Wait for success message
    await expect(page.locator('text=Employer experience updated successfully')).toBeVisible();

    // Verify changes are reflected
    await expect(page.locator('text=Test Employer Experience #2')).toBeVisible();

    await deleteEmployerExperience();
  });

  test('should successfully delete an employer experience with no relationships', async ({ page }) => {
    const { getCreate, getDelete } = getUtility(page, 'Delete Test');

    const create = getCreate();
    const deleteEmployerExperience = getDelete();

    await create();
    await deleteEmployerExperience();
  });
});