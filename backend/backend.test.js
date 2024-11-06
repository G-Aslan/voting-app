const request = require('supertest');
const { app, server } = require('./backend');  // Import both app and server

describe('Backend build sanity check', () => {
  it('should have a backend.js file', () => {
    expect(true).toBe(true);  // Replace with your actual test logic
  });

  it('should be able to require essential modules', () => {
    expect(true).toBe(true);  // Replace with your actual test logic
  });

  it('should respond to / with a status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

// Ensure that the server is closed after all tests
afterAll(() => {
  server.close();  // This ensures the server stops and prevents open handles
});
