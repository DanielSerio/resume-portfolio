import { authenticatedTest as test, expect } from './setup/test-setup';
import { testSkills } from './fixtures';

test.describe('Admin Skills CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the admin skills page
    await page.goto('/admin/skills');

    // Wait for the page to load and MSW to be ready
    await page.waitForLoadState('networkidle');
  });

  test('should display existing skills in the list', async ({ page }) => {
    // Check that the skills list is visible
    await expect(page.locator('[data-testid="skills-list"]')).toBeVisible();

    // Verify that test skills from fixtures are displayed
    const firstSkill = testSkills.at(0);
    const secondSkill = testSkills.at(1);

    await expect(page.locator('[data-testid="skills-list"]').locator(`text=${firstSkill?.name}`).first()).toBeVisible();
    await expect(page.locator('[data-testid="skills-list"]').locator(`text=${secondSkill?.name}`).first()).toBeVisible();
  });

  test('should successfully create a new skill with valid data', async ({ page }) => {
    await page.click('[data-testid="add-skill-button"]');

    // Wait for form to be visible and categories to load
    await expect(page.locator('[data-testid="skill-category-select"]')).toBeVisible();

    // Fill in the form (basic fields only, ignoring employer experience)
    await page.fill('[data-testid="skill-name-input"]', 'Test Skill');

    // Select the first available category option (wait for it to be populated)
    await page.click('[data-testid="skill-category-select"]');

    await expect(page.locator('[data-testid="skill-category-option-1"]')).toBeVisible();
    page.click('[data-testid="skill-category-option-1"]');

    await expect(page.locator('[data-testid="skills-list"]')).toBeVisible();

    // Set comfort level to 50 (middle of 1-100 range)
    await page.click('[data-testid="skill-comfort-level-input"]');

    // Submit the form
    await page.click('[data-testid="save-skill-button"]');

    // Wait for the success message
    await expect(page.locator('text=Skill created successfully')).toBeVisible();
  });

  test('should show validation errors for invalid skill data', async ({ page }) => {
    // Click the "Add Skill" button
    await page.click('[data-testid="add-skill-button"]');

    // Try to submit with empty name
    await page.click('[data-testid="save-skill-button"]');

    // Check for validation errors
    await expect(page.locator('text=Name is required')).toBeVisible();
  });

  test('should successfully update an existing skill', async ({ page }) => {
    const chosenSkill = testSkills.at(1)!;
    // Click edit button for the chosen skill
    await page.click(`[data-testid="edit-skill-${chosenSkill.id}"]`);

    // Update the name
    await page.fill('[data-testid="skill-name-input"]', 'Updated Test Skill');

    // Save changes
    await page.click('[data-testid="save-skill-button"]');

    // Wait for success message
    await expect(page.locator('text=Skill updated successfully')).toBeVisible();
  });

  test('should successfully delete a skill with no relationships', async ({ page }) => {
    const chosenSkill = testSkills.at(1)!;
    await page.click(`[data-testid="delete-skill-${chosenSkill.id}"]`);

    await page.fill('[data-testid="skill-delete-input"]', chosenSkill.name);

    await page.click('[data-testid="skill-delete-button"]');
  });
});