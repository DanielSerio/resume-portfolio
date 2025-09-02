// Global setup for Playwright tests
// No longer using MSW - using Playwright route interception instead

export default async function globalSetup() {
  console.log('Global test setup completed - using Playwright route interception for API mocking');
}

export async function globalTeardown() {
  console.log('Global test teardown completed');
}