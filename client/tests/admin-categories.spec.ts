import { authenticatedTest as test, expect } from './setup/test-setup';

test.describe('Admin Categories CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the admin categories page (user is already logged in via authenticatedTest)
    await page.goto('/admin/categories');

    // Wait for the page to load and MSW to be ready
    await page.waitForLoadState('networkidle');
  });

  test('should display existing categories in the list', async ({ page }) => {
    // Check that the "Add Category" button is visible (indicates page loaded)
    await expect(page.locator('[data-testid="add-category-button"]')).toBeVisible();

    // Verify that test categories are displayed
    await expect(page.locator('text=Programming Languages')).toBeVisible();
    await expect(page.locator('text=Frameworks')).toBeVisible();
    await expect(page.locator('text=Tools')).toBeVisible();
    await expect(page.locator('text=Databases')).toBeVisible();
  });

  test('should successfully create a new category with valid data', async ({ page }) => {
    // Click the "Add Category" button
    await page.click('[data-testid="add-category-button"]');

    // Fill in the form
    await page.fill('[data-testid="category-name-input"]', 'Cloud Services');

    // Submit the form
    await page.click('[data-testid="save-category-button"]');

    // Wait for the success message
    await expect(page.locator('text=Successfully created skill category')).toBeVisible();

    // Verify the new category appears in the list
    await expect(page.locator('text=Cloud Services')).toBeVisible();
  });

  test('should show validation errors for invalid category data', async ({ page }) => {
    // Click the "Add Category" button
    await page.click('[data-testid="add-category-button"]');

    // Try to submit with empty name
    await page.click('[data-testid="save-category-button"]');

    // Check for validation error
    await expect(page.locator('text=Name is required')).toBeVisible();

    // Fill name with only whitespace
    await page.fill('[data-testid="category-name-input"]', '   ');
    await page.click('[data-testid="save-category-button"]');

    // Check for validation error
    await expect(page.locator('text=Name is required')).toBeVisible();
  });

  test('should show error when creating category with duplicate name', async ({ page }) => {
    // Click the "Add Category" button
    await page.click('[data-testid="add-category-button"]');

    // Try to use an existing category name
    await page.fill('[data-testid="category-name-input"]', 'Frameworks');
    await page.click('[data-testid="save-category-button"]');

    // Should show duplicate name error
    await expect(page.locator('text=A category with this name already exists')).toBeVisible();
  });

  test('should successfully update an existing category', async ({ page }) => {
    // Click on the Tools category to edit it
    await page.click('[data-testid="edit-category-tools"]');

    // Update the name
    await page.fill('[data-testid="category-name-input"]', 'Development Tools');

    // Save changes
    await page.click('[data-testid="save-category-button"]');

    // Wait for success message
    await expect(page.locator('text=Successfully updated skill category')).toBeVisible();

    // Verify changes are reflected
    await expect(page.locator('text=Development Tools')).toBeVisible();
    await expect(page.locator('text=Tools')).not.toBeVisible();
  });

  test('should show error when updating with duplicate name', async ({ page }) => {
    // Click on the Tools category to edit it
    await page.click('[data-testid="edit-category-tools"]');

    // Try to change name to an existing category name
    await page.fill('[data-testid="category-name-input"]', 'Databases');

    // Save changes
    await page.click('[data-testid="save-category-button"]');

    // Should show duplicate name error
    await expect(page.locator('text=A category with this name already exists')).toBeVisible();
  });

  test('should successfully delete a category with no relationships', async ({ page }) => {
    // First create a category with no relationships
    await page.click('[data-testid="add-category-button"]');
    await page.fill('[data-testid="category-name-input"]', 'Temporary Category');
    await page.click('[data-testid="save-category-button"]');
    await expect(page.locator('text=Successfully created skill category')).toBeVisible();

    // Close the sheet by clicking outside or pressing escape
    await page.keyboard.press('Escape');

    // Now delete it by clicking the delete button
    await page.click('[data-testid="delete-category-temporary-category"]');

    // Fill the confirmation field
    await page.fill('[data-testid="confirm-delete-input"]', 'Temporary Category');

    // Click delete button
    await page.click('[data-testid="confirm-delete-button"]');

    // Wait for success message
    await expect(page.locator('text=Successfully deleted skill category')).toBeVisible();

    // Verify category is removed from the list
    await expect(page.locator('text=Temporary Category')).not.toBeVisible();
  });

  test('should show error when trying to delete a category with skills', async ({ page }) => {
    // Try to delete Programming Languages category (has skills associated)
    await page.click('[data-testid="delete-category-programming-languages"]');

    // Fill the confirmation field
    await page.fill('[data-testid="confirm-delete-input"]', 'Programming Languages');

    // Confirm deletion
    await page.click('[data-testid="confirm-delete-button"]');

    // Should show error about relationships
    await expect(page.locator('text=Cannot delete category with existing skills or subcategories')).toBeVisible();

    // Category should still be visible in the list
    await expect(page.locator('text=Programming Languages')).toBeVisible();
  });

  test('should show error when trying to delete a category with subcategories', async ({ page }) => {
    // Try to delete Frameworks category (has subcategories associated)
    await page.click('[data-testid="delete-category-frameworks"]');

    // Fill the confirmation field
    await page.fill('[data-testid="confirm-delete-input"]', 'Frameworks');

    // Confirm deletion
    await page.click('[data-testid="confirm-delete-button"]');

    // Should show error about relationships
    await expect(page.locator('text=Cannot delete category with existing skills or subcategories')).toBeVisible();

    // Category should still be visible in the list
    await expect(page.locator('text=Frameworks')).toBeVisible();
  });

  test.skip('should search categories by name', async ({ page }) => {
    // Note: Search functionality needs to be implemented
    // This test is skipped until search is added to the UI
    
    // Use the search input
    await page.fill('[data-testid="categories-search-input"]', 'Frame');

    // Should show only Frameworks
    await expect(page.locator('text=Frameworks')).toBeVisible();

    // Should not show other categories
    await expect(page.locator('text=Programming Languages')).not.toBeVisible();
    await expect(page.locator('text=Tools')).not.toBeVisible();
    await expect(page.locator('text=Databases')).not.toBeVisible();

    // Clear search
    await page.fill('[data-testid="categories-search-input"]', '');

    // All categories should be visible again
    await expect(page.locator('text=Programming Languages')).toBeVisible();
    await expect(page.locator('text=Frameworks')).toBeVisible();
    await expect(page.locator('text=Tools')).toBeVisible();
    await expect(page.locator('text=Databases')).toBeVisible();
  });

  test('should sort categories alphabetically', async ({ page }) => {
    // Categories should be displayed in alphabetical order by default
    const categoryRows = page.locator('[data-testid^="category-row-"]');
    const count = await categoryRows.count();

    // Get category names and verify they are sorted
    const categoryNames: string[] = [];
    for (let i = 0; i < count; i++) {
      const nameElement = categoryRows.nth(i).locator('[data-testid$="-name"]').first();
      const nameText = await nameElement.textContent();
      if (nameText) categoryNames.push(nameText.trim());
    }

    const sortedNames = [...categoryNames].sort();
    expect(categoryNames).toEqual(sortedNames);
  });

  test.skip('should show skill count for each category', async ({ page }) => {
    // Note: Skill count functionality needs to be implemented in the UI
    // This test is skipped until skill counts are added to the category table
    
    // Programming Languages should show 1 skill (JavaScript)
    await expect(page.locator('[data-testid="category-programming-languages-skill-count"]')).toContainText('1');

    // Frameworks should show 2 skills (React, Node.js)
    await expect(page.locator('[data-testid="category-frameworks-skill-count"]')).toContainText('2');

    // Tools should show 0 skills
    await expect(page.locator('[data-testid="category-tools-skill-count"]')).toContainText('0');

    // Databases should show 1 skill (PostgreSQL)
    await expect(page.locator('[data-testid="category-databases-skill-count"]')).toContainText('1');
  });

  test('should handle optimistic updates correctly on create', async ({ page }) => {
    // Click add category
    await page.click('[data-testid="add-category-button"]');

    // Fill form
    await page.fill('[data-testid="category-name-input"]', 'Machine Learning');

    // Submit form
    await page.click('[data-testid="save-category-button"]');

    // The category should appear immediately (optimistic update)
    await expect(page.locator('text=Machine Learning')).toBeVisible();

    // Then success message should appear
    await expect(page.locator('text=Successfully created skill category')).toBeVisible();
  });

  test('should invalidate and refetch queries after successful operations', async ({ page }) => {
    // Note the initial count
    const initialCategoryCount = await page.locator('[data-testid^="category-row-"]').count();

    // Create a new category
    await page.click('[data-testid="add-category-button"]');
    await page.fill('[data-testid="category-name-input"]', 'Testing Tools');
    await page.click('[data-testid="save-category-button"]');

    // Wait for success message
    await expect(page.locator('text=Successfully created skill category')).toBeVisible();

    // Wait for the new category to appear
    await expect(page.locator('text=Testing Tools')).toBeVisible();

    // The count should increase
    const finalCategoryCount = await page.locator('[data-testid^="category-row-"]').count();
    expect(finalCategoryCount).toBe(initialCategoryCount + 1);

    // Navigate away and back to verify data persistence
    await page.goto('/admin/skills');
    await page.goto('/admin/categories');

    // The new category should still be there
    await expect(page.locator('text=Testing Tools')).toBeVisible();
  });

  test('should handle form validation on edit', async ({ page }) => {
    // Click on the Tools category to edit it
    await page.click('[data-testid="edit-category-tools"]');

    // Clear the name field
    await page.fill('[data-testid="category-name-input"]', '');

    // Try to save
    await page.click('[data-testid="save-category-button"]');

    // Should show validation error
    await expect(page.locator('text=Name is required')).toBeVisible();

    // Cancel the edit
    await page.click('[data-testid="cancel-edit-button"]');

    // Should return to list view with original name
    await expect(page.locator('text=Tools')).toBeVisible();
  });
});