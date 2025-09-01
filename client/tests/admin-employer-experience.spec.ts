import { authenticatedTest, expect } from './setup/test-setup';

authenticatedTest.describe('Admin Employer Experience CRUD Operations', () => {
  authenticatedTest.beforeEach(async ({ page }) => {
    // Navigate to the admin employer experience page
    await page.goto('/admin/employer-experience');

    // Wait for the page to load and MSW to be ready
    await page.waitForLoadState('networkidle');
  });

  authenticatedTest('should display existing employer experiences in the list', async ({ page }) => {
    // Check that the employer experiences list is visible
    await expect(page.locator('[data-testid="employer-experiences-list"]')).toBeVisible();

    // Verify that test employer experiences are displayed
    await expect(page.locator('text=Company A')).toBeVisible();
    await expect(page.locator('text=Company B')).toBeVisible();
    await expect(page.locator('text=Freelance')).toBeVisible();
  });

  authenticatedTest('should successfully create a new employer experience with valid data', async ({ page }) => {
    // Click the "Add Employer Experience" button
    await page.click('[data-testid="add-employer-experience-button"]');

    // Fill in the form
    await page.fill('[data-testid="employer-name-input"]', 'Startup Inc');
    await page.fill('[data-testid="employer-description-input"]', 'Fast-growing tech startup');
    await page.fill('[data-testid="employer-start-date-input"]', '2024-01-01');
    await page.fill('[data-testid="employer-end-date-input"]', '2024-12-31');

    // Submit the form
    await page.click('[data-testid="save-employer-experience-button"]');

    // Wait for the success message
    await expect(page.locator('text=Employer experience created successfully')).toBeVisible();

    // Verify the new employer experience appears in the list
    await expect(page.locator('text=Startup Inc')).toBeVisible();
  });

  authenticatedTest('should successfully create employer experience with no end date (current)', async ({ page }) => {
    // Click the "Add Employer Experience" button
    await page.click('[data-testid="add-employer-experience-button"]');

    // Fill in the form (no end date = current position)
    await page.fill('[data-testid="employer-name-input"]', 'Current Company');
    await page.fill('[data-testid="employer-description-input"]', 'Current employment');
    await page.fill('[data-testid="employer-start-date-input"]', '2023-06-01');
    // Leave end date empty

    // Submit the form
    await page.click('[data-testid="save-employer-experience-button"]');

    // Wait for the success message
    await expect(page.locator('text=Employer experience created successfully')).toBeVisible();

    // Verify the new employer experience shows as "Current"
    await expect(page.locator('text=Current Company')).toBeVisible();
    await expect(page.locator('[data-testid="employer-current-company-status"]')).toContainText('Current');
  });

  authenticatedTest('should show validation errors for invalid employer experience data', async ({ page }) => {
    // Click the "Add Employer Experience" button
    await page.click('[data-testid="add-employer-experience-button"]');

    // Try to submit with empty name
    await page.click('[data-testid="save-employer-experience-button"]');

    // Check for validation error
    await expect(page.locator('text=Name is required')).toBeVisible();

    // Fill name but invalid date range (end before start)
    await page.fill('[data-testid="employer-name-input"]', 'Test Company');
    await page.fill('[data-testid="employer-start-date-input"]', '2024-06-01');
    await page.fill('[data-testid="employer-end-date-input"]', '2024-01-01');

    await page.click('[data-testid="save-employer-experience-button"]');

    // Check for date range validation error
    await expect(page.locator('text=End date must be after start date')).toBeVisible();
  });

  authenticatedTest('should successfully update an existing employer experience', async ({ page }) => {
    // Click edit button for Company A
    await page.click('[data-testid="edit-employer-experience-company-a"]');

    // Update the description
    await page.fill('[data-testid="employer-description-input"]', 'Updated description for Company A');

    // Update end date (extend the contract)
    await page.fill('[data-testid="employer-end-date-input"]', '2023-06-30');

    // Save changes
    await page.click('[data-testid="save-employer-experience-button"]');

    // Wait for success message
    await expect(page.locator('text=Employer experience updated successfully')).toBeVisible();

    // Verify changes are reflected
    await expect(page.locator('text=Updated description for Company A')).toBeVisible();
  });

  authenticatedTest('should show error when updating with duplicate name', async ({ page }) => {
    // Click edit button for Company A
    await page.click('[data-testid="edit-employer-experience-company-a"]');

    // Try to change name to an existing employer name
    await page.fill('[data-testid="employer-name-input"]', 'Company B');

    // Save changes
    await page.click('[data-testid="save-employer-experience-button"]');

    // Should show duplicate name error
    await expect(page.locator('text=An employer experience with this name already exists')).toBeVisible();
  });

  authenticatedTest('should successfully delete an employer experience with no relationships', async ({ page }) => {
    // First create an employer experience with no relationships
    await page.click('[data-testid="add-employer-experience-button"]');
    await page.fill('[data-testid="employer-name-input"]', 'Temporary Company');
    await page.fill('[data-testid="employer-start-date-input"]', '2024-01-01');
    await page.click('[data-testid="save-employer-experience-button"]');
    await expect(page.locator('text=Employer experience created successfully')).toBeVisible();

    // Now delete it
    await page.click('[data-testid="delete-employer-experience-temporary-company"]');

    // Confirm deletion in modal
    await expect(page.locator('text=Are you sure you want to delete this employer experience?')).toBeVisible();
    await page.click('[data-testid="confirm-delete-button"]');

    // Wait for success message
    await expect(page.locator('text=Employer experience deleted successfully')).toBeVisible();

    // Verify employer experience is removed from the list
    await expect(page.locator('text=Temporary Company')).not.toBeVisible();
  });

  authenticatedTest('should show error when trying to delete employer experience with skills', async ({ page }) => {
    // Try to delete Company A (has skills associated)
    await page.click('[data-testid="delete-employer-experience-company-a"]');

    // Confirm deletion
    await page.click('[data-testid="confirm-delete-button"]');

    // Should show error about relationships
    await expect(page.locator('text=Cannot delete employer experience with existing skill relationships')).toBeVisible();

    // Employer experience should still be visible in the list
    await expect(page.locator('text=Company A')).toBeVisible();
  });

  authenticatedTest('should search employer experiences by name', async ({ page }) => {
    // Use the search input
    await page.fill('[data-testid="employer-experiences-search-input"]', 'Company');

    // Should show only companies
    await expect(page.locator('text=Company A')).toBeVisible();
    await expect(page.locator('text=Company B')).toBeVisible();

    // Should not show Freelance
    await expect(page.locator('text=Freelance')).not.toBeVisible();

    // Clear search
    await page.fill('[data-testid="employer-experiences-search-input"]', '');

    // All employer experiences should be visible again
    await expect(page.locator('text=Company A')).toBeVisible();
    await expect(page.locator('text=Company B')).toBeVisible();
    await expect(page.locator('text=Freelance')).toBeVisible();
  });

  authenticatedTest('should sort employer experiences by start date', async ({ page }) => {
    // Click on start date sort
    await page.click('[data-testid="sort-by-start-date"]');

    // Get all employer experience rows
    const empRows = page.locator('[data-testid^="employer-experience-row-"]');
    const count = await empRows.count();

    // Verify they are sorted by start date (most recent first)
    let previousStartDate = '9999-12-31'; // Start with future date
    for (let i = 0; i < count; i++) {
      const startDateText = await empRows.nth(i).locator('[data-testid$="-start-date"]').textContent();
      if (startDateText && startDateText !== 'Unknown') {
        expect(startDateText).toBeLessThanOrEqual(previousStartDate);
        previousStartDate = startDateText;
      }
    }
  });

  authenticatedTest('should show duration for each employer experience', async ({ page }) => {
    // Company A should show duration (2 years)
    await expect(page.locator('[data-testid="employer-experience-company-a-duration"]')).toContainText('2 years');

    // Company B should show "Current" (no end date)
    await expect(page.locator('[data-testid="employer-experience-company-b-duration"]')).toContainText('Current');

    // Freelance should show "Current" (no end date)
    await expect(page.locator('[data-testid="employer-experience-freelance-duration"]')).toContainText('Current');
  });

  authenticatedTest('should filter by employment status (current vs past)', async ({ page }) => {
    // Filter by current employers
    await page.selectOption('[data-testid="employment-status-filter"]', 'current');

    // Should show only current employers
    await expect(page.locator('text=Company B')).toBeVisible();
    await expect(page.locator('text=Freelance')).toBeVisible();

    // Should not show past employers
    await expect(page.locator('text=Company A')).not.toBeVisible();

    // Filter by past employers
    await page.selectOption('[data-testid="employment-status-filter"]', 'past');

    // Should show only past employers
    await expect(page.locator('text=Company A')).toBeVisible();

    // Should not show current employers
    await expect(page.locator('text=Company B')).not.toBeVisible();
    await expect(page.locator('text=Freelance')).not.toBeVisible();
  });

  authenticatedTest('should handle optimistic updates correctly on create', async ({ page }) => {
    // Click add employer experience
    await page.click('[data-testid="add-employer-experience-button"]');

    // Fill form
    await page.fill('[data-testid="employer-name-input"]', 'New Venture');
    await page.fill('[data-testid="employer-start-date-input"]', '2024-03-01');

    // Submit form
    await page.click('[data-testid="save-employer-experience-button"]');

    // The employer experience should appear immediately (optimistic update)
    await expect(page.locator('text=New Venture')).toBeVisible();

    // Then success message should appear
    await expect(page.locator('text=Employer experience created successfully')).toBeVisible();
  });
});