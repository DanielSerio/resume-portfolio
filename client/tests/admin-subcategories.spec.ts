import { authenticatedTest as test, expect } from './setup/test-setup';
import { testSubcategories } from './fixtures';

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

    // Verify that test subcategories from fixtures are displayed
    const firstSub = testSubcategories.at(0);
    const secondSub = testSubcategories.at(1);

    await expect(page.locator('[data-testid="subcategories-list"]').locator(`text=${firstSub?.name}`).first()).toBeVisible();
    await expect(page.locator('[data-testid="subcategories-list"]').locator(`text=${secondSub?.name}`).first()).toBeVisible();
  });

  test('should successfully create a new subcategory with valid data', async ({ page }) => {
    await page.click('[data-testid="add-subcategory-button"]');

    // Fill in the form
    await page.fill('[data-testid="subcategory-name-input"]', 'Test Subcategory');

    // Submit the form
    await page.click('[data-testid="save-subcategory-button"]');

    // Wait for the success message
    await expect(page.locator('text=Subcategory created successfully')).toBeVisible();
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
    const chosenSubcategory = testSubcategories.at(1)!;
    // Click edit button for the chosen subcategory
    await page.click(`[data-testid="edit-subcategory-${chosenSubcategory.id}"]`);

    // Update the name
    await page.fill('[data-testid="subcategory-name-input"]', 'Test Subcategory #2');

    // Save changes
    await page.click('[data-testid="save-subcategory-button"]');

    // Wait for success message
    await expect(page.locator('text=Subcategory updated successfully')).toBeVisible();
  });

  test('should successfully delete a subcategory with no relationships', async ({ page }) => {
    const chosenSubcategory = testSubcategories.at(1)!;
    await page.click(`[data-testid="delete-subcategory-${chosenSubcategory.id}"]`);

    await page.fill('[data-testid="subcategory-delete-input"]', chosenSubcategory.name);

    await page.click('[data-testid="subcategory-delete-button"]');
  });
});