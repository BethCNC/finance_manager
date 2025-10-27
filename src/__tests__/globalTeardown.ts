// Global teardown for Jest tests
export default async function globalTeardown() {
  console.log('Cleaning up global test environment...');
  
  // Clean up any global resources
  if (global.mockServices) {
    delete global.mockServices;
  }
  
  console.log('Global test environment cleanup complete');
}
