import { test as base, expect } from '@playwright/test';
import { loginAsAdmin } from '../helpers/auth-helpers';
import {
  testCategories,
  testSubcategories,
  testEmployerExperiences,
  testSkills,
  testSkillEmployerExperiences,
  getAllSkillsWithRelationships,
  type TestCategory,
  type TestSubcategory,
  type TestEmployerExperience,
  type TestSkill,
} from '../fixtures';

// In-memory storage for test data (simulates database)
let categories = [...testCategories];
let subcategories = [...testSubcategories];
let employerExperiences = [...testEmployerExperiences];
let skills = [...testSkills];
let skillEmployerExperiences = [...testSkillEmployerExperiences];

// Helper to generate new IDs
function generateId(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// Helper functions to reset data between tests
function resetTestData() {
  categories = [...testCategories];
  subcategories = [...testSubcategories];
  employerExperiences = [...testEmployerExperiences];
  skills = [...testSkills];
  skillEmployerExperiences = [...testSkillEmployerExperiences];
}

// Basic test fixture for non-admin tests that don't need authentication
export const test = base;

// Create an authenticated test that automatically logs in
export const authenticatedTest = base.extend({
  page: async ({ page }, use) => {
    // IMPORTANT: Setup route handlers BEFORE any navigation/login
    // Reset test data before each test
    resetTestData();

    // Setup request interception to mock Supabase auth API calls
    await page.route('http://127.0.0.1:54321/auth/v1/token*', async (route) => {
      if (route.request().method() === 'POST') {
        console.log(`🔐 Mocking auth token: ${route.request().method()} ${route.request().url()}`);
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            access_token: 'mock-access-token',
            refresh_token: 'mock-refresh-token',
            expires_in: 3600,
            token_type: 'bearer',
            user: {
              id: 'test-user-id',
              email: 'admin@test.com',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            }
          })
        });
      }
      await route.continue();
    });

    await page.route('http://127.0.0.1:54321/auth/v1/user*', async (route) => {
      if (route.request().method() === 'GET') {
        console.log(`👤 Mocking user: ${route.request().method()} ${route.request().url()}`);
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'test-user-id',
            email: 'admin@test.com',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          })
        });
      }
      await route.continue();
    });

    await page.route('http://127.0.0.1:54321/auth/v1/logout*', async (route) => {
      if (route.request().method() === 'POST') {
        return route.fulfill({
          status: 204,
          contentType: 'application/json',
          body: ''
        });
      }
      await route.continue();
    });

    // Setup comprehensive REST API mocking for all endpoints

    // Categories endpoint
    await page.route('http://127.0.0.1:54321/rest/v1/skill_category*', async (route) => {
      const method = route.request().method();
      const url = new URL(route.request().url());
      console.log(`📂 Mocking category: ${method} ${route.request().url()}`);

      if (method === 'GET') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(categories)
        });
      } else if (method === 'POST') {
        const body = await route.request().postDataJSON();
        const id = generateId(body.name || '');
        const newCategory: TestCategory = {
          id,
          name: body.name || '',
        };
        categories.push(newCategory);
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(newCategory)
        });
      } else if (method === 'PATCH') {
        const id = url.searchParams.get('id');
        const body = await route.request().postDataJSON();
        const categoryIndex = categories.findIndex(c => c.id === id?.replace('eq.', ''));
        if (categoryIndex === -1) {
          return route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Category not found' })
          });
        }
        categories[categoryIndex] = { ...categories[categoryIndex], ...body };
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(categories[categoryIndex])
        });
      } else if (method === 'DELETE') {
        const id = url.searchParams.get('id');
        const categoryIndex = categories.findIndex(c => c.id === id?.replace('eq.', ''));
        if (categoryIndex === -1) {
          return route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Category not found' })
          });
        }
        categories.splice(categoryIndex, 1);
        return route.fulfill({
          status: 204,
          contentType: 'application/json',
          body: ''
        });
      }

      await route.continue();
    });

    // Subcategories endpoint
    await page.route('http://127.0.0.1:54321/rest/v1/skill_subcategory*', async (route) => {
      const method = route.request().method();
      const url = new URL(route.request().url());
      console.log(`📂 Mocking subcategory: ${method} ${route.request().url()}`);

      if (method === 'GET') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(subcategories)
        });
      } else if (method === 'POST') {
        const body = await route.request().postDataJSON();
        const id = generateId(body.name || '');
        const newSubcategory: TestSubcategory = {
          id,
          name: body.name || ''
        };
        subcategories.push(newSubcategory);
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(newSubcategory)
        });
      } else if (method === 'PATCH') {
        const id = url.searchParams.get('id');
        const body = await route.request().postDataJSON();
        const subcategoryIndex = subcategories.findIndex(sc => sc.id === id?.replace('eq.', ''));
        if (subcategoryIndex === -1) {
          return route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Subcategory not found' })
          });
        }
        subcategories[subcategoryIndex] = { ...subcategories[subcategoryIndex], ...body };
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(subcategories[subcategoryIndex])
        });
      } else if (method === 'DELETE') {
        const id = url.searchParams.get('id');
        const subcategoryIndex = subcategories.findIndex(sc => sc.id === id?.replace('eq.', ''));
        if (subcategoryIndex === -1) {
          return route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Subcategory not found' })
          });
        }
        subcategories.splice(subcategoryIndex, 1);
        return route.fulfill({
          status: 204,
          contentType: 'application/json',
          body: ''
        });
      }

      await route.continue();
    });

    // Employer Experience endpoint
    await page.route('http://127.0.0.1:54321/rest/v1/employer_experience*', async (route) => {
      const method = route.request().method();
      const url = new URL(route.request().url());
      console.log(`🏢 Mocking employer_experience: ${method} ${route.request().url()}`);

      if (method === 'GET') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(employerExperiences)
        });
      } else if (method === 'POST') {
        const body = await route.request().postDataJSON();
        const id = generateId(body.name || '');
        const newEmployerExperience: TestEmployerExperience = {
          id,
          name: body.name || '',
        };
        employerExperiences.push(newEmployerExperience);
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(newEmployerExperience)
        });
      } else if (method === 'PATCH') {
        const id = url.searchParams.get('id');
        const body = await route.request().postDataJSON();
        const empIndex = employerExperiences.findIndex(e => e.id === id?.replace('eq.', ''));
        if (empIndex === -1) {
          return route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Employer experience not found' })
          });
        }
        employerExperiences[empIndex] = { ...employerExperiences[empIndex], ...body };
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(employerExperiences[empIndex])
        });
      } else if (method === 'DELETE') {
        const id = url.searchParams.get('id');
        const empIndex = employerExperiences.findIndex(e => e.id === id?.replace('eq.', ''));
        if (empIndex === -1) {
          return route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Employer experience not found' })
          });
        }
        employerExperiences.splice(empIndex, 1);
        return route.fulfill({
          status: 204,
          contentType: 'application/json',
          body: ''
        });
      }

      await route.continue();
    });

    // Skills endpoint (with complex relationship handling)
    await page.route('**/rest/v1/skill?*', async (route) => {
      const method = route.request().method();
      const url = new URL(route.request().url());
      const select = url.searchParams.get('select');
      console.log(`⚡ Mocking skill: ${method} ${route.request().url()}`);

      if (method === 'GET') {
        // Handle complex relationship queries
        if (select?.includes('category:category_id')) {
          // This is the grouped skills query with relationships
          const skillsWithRelationships = getAllSkillsWithRelationships();
          console.log('🔍 Skills with relationships:', JSON.stringify(skillsWithRelationships, null, 2));
          return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(skillsWithRelationships)
          });
        }

        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(skills)
        });
      } else if (method === 'POST') {
        const body = await route.request().postDataJSON();
        const id = generateId(body.name || '');
        const newSkill: TestSkill = {
          id,
          name: body.name || '',
          comfort_level: body.comfort_level || 1,
          category_id: body.category_id || '',
          subcategory_id: body.subcategory_id || undefined,
          last_updated_at: new Date().toISOString(),
        };
        skills.push(newSkill);
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(newSkill)
        });
      } else if (method === 'PATCH') {
        const id = url.searchParams.get('id');
        const body = await route.request().postDataJSON();
        const skillIndex = skills.findIndex(s => s.id === id?.replace('eq.', ''));
        if (skillIndex === -1) {
          return route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Skill not found' })
          });
        }
        skills[skillIndex] = { ...skills[skillIndex], ...body };
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(skills[skillIndex])
        });
      } else if (method === 'DELETE') {
        const id = url.searchParams.get('id');
        const skillIndex = skills.findIndex(s => s.id === id?.replace('eq.', ''));
        if (skillIndex === -1) {
          return route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Skill not found' })
          });
        }
        skills.splice(skillIndex, 1);
        return route.fulfill({
          status: 204,
          contentType: 'application/json',
          body: ''
        });
      }

      await route.continue();
    });

    // Skill-Employer Experience junction table endpoint
    await page.route('http://127.0.0.1:54321/rest/v1/skill_employer_experience*', async (route) => {
      const method = route.request().method();
      const url = new URL(route.request().url());
      console.log(`🔗 Mocking skill_employer_experience: ${method} ${route.request().url()}`);
      
      if (method === 'DELETE') {
        const skillId = url.searchParams.get('skill_id');
        if (skillId) {
          const decodedSkillId = skillId.replace('eq.', '');
          // Remove relationships for this skill
          const initialCount = skillEmployerExperiences.length;
          skillEmployerExperiences = skillEmployerExperiences.filter(se => se.skill_id !== decodedSkillId);
          const removedCount = initialCount - skillEmployerExperiences.length;
          console.log(`🔗 Removed ${removedCount} skill-employer relationships for skill: ${decodedSkillId}`);
        }
        return route.fulfill({
          status: 204,
          contentType: 'application/json',
          body: ''
        });
      } else if (method === 'POST') {
        const body = await route.request().postDataJSON();
        // Handle array of relationships or single relationship
        const relationships = Array.isArray(body) ? body : [body];
        relationships.forEach(rel => {
          skillEmployerExperiences.push({
            skill_id: rel.skill_id,
            employer_experience_id: rel.employer_experience_id,
          });
        });
        console.log(`🔗 Added ${relationships.length} skill-employer relationships`);
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(relationships)
        });
      }
      
      await route.continue();
    });

    // NOW login after route handlers are set up
    await loginAsAdmin(page);

    await use(page);

    // Catch-all logging for any unhandled requests
    await page.route('http://127.0.0.1:54321/**', async (route) => {
      console.log(`⚠️  Unhandled request: ${route.request().method()} ${route.request().url()}`);
      await route.continue();
    });
  },
});

export { expect } from '@playwright/test';