import { authenticatedTest as test, expect } from './setup/test-setup';

test.describe('Admin Skills CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the admin skills page (user is already logged in via authenticatedTest)
    await page.goto('/admin/skills');
    
    // Wait for the page to load and MSW to be ready
    await page.waitForLoadState('networkidle');
  });

  test('should display existing skills in the list', async ({ page }) => {
    // Check that the skills list is visible
    await expect(page.locator('[data-testid="skills-list"]')).toBeVisible();
    
    // Verify that test skills are displayed
    await expect(page.locator('text=JavaScript')).toBeVisible();
    await expect(page.locator('text=React')).toBeVisible();
    await expect(page.locator('text=Node.js')).toBeVisible();
    await expect(page.locator('text=PostgreSQL')).toBeVisible();
  });

  test('should successfully create a new skill with valid data', async ({ page }) => {
    // Click the "Add Skill" button
    await page.click('[data-testid="add-skill-button"]');
    
    // Fill in the form
    await page.fill('[data-testid="skill-name-input"]', 'TypeScript');
    await page.selectOption('[data-testid="skill-category-select"]', 'programming-languages');
    await page.fill('[data-testid="skill-comfort-level-input"]', '8');
    
    // Submit the form
    await page.click('[data-testid="save-skill-button"]');
    
    // Wait for the success message
    await expect(page.locator('text=Skill created successfully')).toBeVisible();
    
    // Verify the new skill appears in the list
    await expect(page.locator('text=TypeScript')).toBeVisible();
  });

  test('should show validation errors for invalid skill data', async ({ page }) => {
    // Click the "Add Skill" button
    await page.click('[data-testid="add-skill-button"]');
    
    // Try to submit with empty name
    await page.click('[data-testid="save-skill-button"]');
    
    // Check for validation error
    await expect(page.locator('text=Name is required')).toBeVisible();
    
    // Fill name but with invalid comfort level
    await page.fill('[data-testid="skill-name-input"]', 'Test Skill');
    await page.fill('[data-testid="skill-comfort-level-input"]', '15'); // Invalid: > 10
    
    await page.click('[data-testid="save-skill-button"]');
    
    // Check for comfort level validation error
    await expect(page.locator('text=Comfort level must be between 1 and 10')).toBeVisible();
  });

  test('should successfully update an existing skill', async ({ page }) => {
    // Click edit button for JavaScript skill
    await page.click('[data-testid="edit-skill-javascript"]');
    
    // Update the comfort level
    await page.fill('[data-testid="skill-comfort-level-input"]', '10');
    
    // Update subcategory
    await page.selectOption('[data-testid="skill-subcategory-select"]', 'frontend');
    
    // Save changes
    await page.click('[data-testid="save-skill-button"]');
    
    // Wait for success message
    await expect(page.locator('text=Skill updated successfully')).toBeVisible();
    
    // Verify changes are reflected (comfort level should show as 10/10)
    await expect(page.locator('[data-testid="skill-javascript-comfort-level"]')).toContainText('10');
  });

  test('should show error when updating with duplicate name', async ({ page }) => {
    // Click edit button for JavaScript skill
    await page.click('[data-testid="edit-skill-javascript"]');
    
    // Try to change name to an existing skill name
    await page.fill('[data-testid="skill-name-input"]', 'React');
    
    // Save changes
    await page.click('[data-testid="save-skill-button"]');
    
    // Should show duplicate name error
    await expect(page.locator('text=A skill with this name already exists')).toBeVisible();
  });

  test('should successfully delete a skill', async ({ page }) => {
    // Click delete button for PostgreSQL skill
    await page.click('[data-testid="delete-skill-postgresql"]');
    
    // Confirm deletion in modal
    await expect(page.locator('text=Are you sure you want to delete this skill?')).toBeVisible();
    await page.click('[data-testid="confirm-delete-button"]');
    
    // Wait for success message
    await expect(page.locator('text=Skill deleted successfully')).toBeVisible();
    
    // Verify skill is removed from the list
    await expect(page.locator('text=PostgreSQL')).not.toBeVisible();
  });

  test('should show error when trying to delete a skill with relationships', async ({ page }) => {
    // Try to delete JavaScript skill (has employer relationships)
    await page.click('[data-testid="delete-skill-javascript"]');
    
    // Confirm deletion
    await page.click('[data-testid="confirm-delete-button"]');
    
    // Should show error about relationships
    await expect(page.locator('text=Cannot delete skill with existing employer experience relationships')).toBeVisible();
    
    // Skill should still be visible in the list
    await expect(page.locator('text=JavaScript')).toBeVisible();
  });

  test('should filter skills by category', async ({ page }) => {
    // Use the category filter
    await page.selectOption('[data-testid="category-filter-select"]', 'frameworks');
    
    // Should show only framework skills
    await expect(page.locator('text=React')).toBeVisible();
    await expect(page.locator('text=Node.js')).toBeVisible();
    
    // Should not show programming language skills
    await expect(page.locator('text=JavaScript')).not.toBeVisible();
  });

  test('should search skills by name', async ({ page }) => {
    // Use the search input
    await page.fill('[data-testid="skills-search-input"]', 'React');
    
    // Should show only React
    await expect(page.locator('text=React')).toBeVisible();
    
    // Should not show other skills
    await expect(page.locator('text=JavaScript')).not.toBeVisible();
    await expect(page.locator('text=Node.js')).not.toBeVisible();
    
    // Clear search
    await page.fill('[data-testid="skills-search-input"]', '');
    
    // All skills should be visible again
    await expect(page.locator('text=JavaScript')).toBeVisible();
    await expect(page.locator('text=React')).toBeVisible();
  });

  test('should sort skills by comfort level', async ({ page }) => {
    // Click on comfort level sort
    await page.click('[data-testid="sort-by-comfort-level"]');
    
    // Get all skill rows
    const skillRows = page.locator('[data-testid^="skill-row-"]');
    const count = await skillRows.count();
    
    // Verify they are sorted by comfort level (descending)
    let previousComfortLevel = 11; // Start higher than max
    for (let i = 0; i < count; i++) {
      const comfortLevelText = await skillRows.nth(i).locator('[data-testid$="-comfort-level"]').textContent();
      const comfortLevel = parseInt(comfortLevelText?.split('/')[0] || '0');
      
      expect(comfortLevel).toBeLessThanOrEqual(previousComfortLevel);
      previousComfortLevel = comfortLevel;
    }
  });

  test('should handle optimistic updates correctly on create', async ({ page }) => {
    // Click add skill
    await page.click('[data-testid="add-skill-button"]');
    
    // Fill form
    await page.fill('[data-testid="skill-name-input"]', 'Python');
    await page.selectOption('[data-testid="skill-category-select"]', 'programming-languages');
    await page.fill('[data-testid="skill-comfort-level-input"]', '7');
    
    // Submit form
    await page.click('[data-testid="save-skill-button"]');
    
    // The skill should appear immediately (optimistic update)
    await expect(page.locator('text=Python')).toBeVisible();
    
    // Then success message should appear
    await expect(page.locator('text=Skill created successfully')).toBeVisible();
  });

  test('should invalidate and refetch queries after successful operations', async ({ page }) => {
    // Note the initial count
    const initialSkillCount = await page.locator('[data-testid^="skill-row-"]').count();
    
    // Create a new skill
    await page.click('[data-testid="add-skill-button"]');
    await page.fill('[data-testid="skill-name-input"]', 'Go');
    await page.selectOption('[data-testid="skill-category-select"]', 'programming-languages');
    await page.fill('[data-testid="skill-comfort-level-input"]', '6');
    await page.click('[data-testid="save-skill-button"]');
    
    // Wait for success message
    await expect(page.locator('text=Skill created successfully')).toBeVisible();
    
    // The count should increase
    await expect(page.locator('[data-testid^="skill-row-"]')).toHaveCount(initialSkillCount + 1);
    
    // Navigate away and back to verify data persistence
    await page.goto('/admin/categories');
    await page.goto('/admin/skills');
    
    // The new skill should still be there
    await expect(page.locator('text=Go')).toBeVisible();
  });
});