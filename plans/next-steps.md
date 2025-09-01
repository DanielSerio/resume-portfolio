## Next Steps

1. Add logo images to skills?

- IGNORE THIS STEP FOR NOW

2. setup a CI/CD pipeline for github to AWS

- IGNORE THIS STEP FOR NOW

3. Admin CRUD route testing:

- Tests should test the following features:
  - Create Skill
  - Update Skill
  - Delete Skill
  - Create Category
  - Update Category
  - Delete Category
  - Create Subcategory
  - Update Subcategory
  - Delete Subcategory
  - Create Employer Experience
  - Update Employer Experience
  - Delete Employer Experience

**Questions:**

1. Should these be integration tests that test the full flow from UI to database, or unit tests for individual API endpoints?

- integration tests that test the full flow from UI to database

2. What testing framework should be used - Jest, Vitest, Cypress, Playwright, or something else?

- We have storybook installed, so Playwright

3. Should tests include validation of error cases (e.g., duplicate names, missing required fields, invalid IDs)?

- Yes

4. Do we need to test the relational aspects (e.g., cascading deletes, foreign key constraints)?

- Yes

5. Should tests verify that the query invalidation works correctly after CRUD operations?

- Yes

6. Do we need to mock the Supabase client or test against a real test database?

- Mock the supabase client

7. Should tests cover the form validation and UI state changes, or just the data operations?

- Just the data operations for now

8. Should we set up a test database environment or use MSW (Mock Service Worker) to mock the API calls?

- MSW

9. Do we need to test the toast notifications and error handling flows?

- For now, no.

10. Should tests verify the optimistic updates and rollback behavior on failures?

- Yes

11. What should be the test data setup strategy - fixtures, factories, or inline test data?

- Fixtures

12. Should we test the query caching and refetching behavior after mutations?

- Yes, See #5

13. Do we need to test concurrent operations (e.g., multiple users creating skills simultaneously)?

- No, There is only 1 user.

14. Should tests verify the ID transformation logic (lowercase, encoded URI components)?

- No

15. Should tests run against the Admin pages or test the hooks/mutations directly?

- run against the Admin pages

16. What should be the test file organization - separate files for each entity type or grouped by operation type?

- separate files for each entity type

17. Should we mock React Query's QueryClient or use a real instance with custom config for tests?

- use a real instance with custom config for tests

18. Do we need to test the form submission flow including validation errors and loading states?

- Yes

19. Should tests verify the mutation success/error callbacks and their side effects?

- No

20. What should be the fixture data structure - minimal or comprehensive with all relationships?

- comprehensive with all relationships

21. Should we test both happy path and edge cases for each CRUD operation in the same test file?

- Yes

22. What should be the test naming convention - descriptive sentences or structured patterns?

- descriptive sentences

23. Should tests clean up created data after each test or use database transactions?

- use database transactions if applicable

24. Do we need to test the Storybook integration or just the actual admin pages?

- Just the actual admin pages

25. Should we verify the URL routing and navigation after CRUD operations?

- No
