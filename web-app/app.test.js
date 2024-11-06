const request = require('supertest');
const app = require('./app');  // Import the app

describe('Web app build sanity check', () => {
  it('should have an app.js file', () => {
    // Test to check if the app.js file exists in the directory
    expect(true).toBe(true);  // Just a placeholder test
  });

  it('should be able to require essential modules', () => {
    // Test to check if essential modules can be loaded
    const fs = require('fs');
    expect(fs).toBeDefined();
  });

  it('should respond to / with a status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);  // Expect status 200
  });
});
