import { authenticatedTest as test, expect } from './setup/test-setup';
import { testEmployerExperiences } from './fixtures';

test.describe('Admin Employer Experience CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the admin employer experience page
    await page.goto('/admin/employer-experiences');

    // Wait for the page to load and MSW to be ready
    await page.waitForLoadState('networkidle');
  });

  test('should display existing employer experiences in the list', async ({ page }) => {
    // Check that the employer experiences list is visible
    await expect(page.locator('[data-testid="employer-experiences-list"]')).toBeVisible();

    // Verify that test employer experiences from fixtures are displayed
    const firstEmp = testEmployerExperiences.at(0);
    const secondEmp = testEmployerExperiences.at(1);

    await expect(page.locator('[data-testid="employer-experiences-list"]').locator(`text=${firstEmp?.name}`).first()).toBeVisible();
    await expect(page.locator('[data-testid="employer-experiences-list"]').locator(`text=${secondEmp?.name}`).first()).toBeVisible();
  });

  test('should successfully create a new employer experience with valid data', async ({ page }) => {
    await page.click('[data-testid="add-employer-experience-button"]');

    // Fill in the form
    await page.fill('[data-testid="employer-name-input"]', 'Test Employer');

    // Submit the form
    await page.click('[data-testid="save-employer-experience-button"]');

    // Wait for the success message
    await expect(page.locator('text=Employer experience created successfully')).toBeVisible();
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
    const chosenEmployer = testEmployerExperiences.at(1)!;
    // Click edit button for the chosen employer experience
    await page.click(`[data-testid="edit-employer-experience-${chosenEmployer.id}"]`);

    // Update the name
    await page.fill('[data-testid="employer-name-input"]', 'Test Employer Experience #2');

    // Save changes
    await page.click('[data-testid="save-employer-experience-button"]');

    // Wait for success message
    await expect(page.locator('text=Employer experience updated successfully')).toBeVisible();
  });

  test('should successfully delete an employer experience with no relationships', async ({ page }) => {
    const chosenEmployer = testEmployerExperiences.at(1)!;
    await page.click(`[data-testid="delete-employer-experience-${chosenEmployer.id}"]`);

    await page.fill('[data-testid="employer-experience-delete-input"]', chosenEmployer.name);

    await page.click('[data-testid="employer-experience-delete-button"]');
  });
});