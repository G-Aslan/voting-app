const fs = require('fs');
const path = require('path');
const { app } = require('./app'); // Import the app
const request = require('supertest'); // To make HTTP requests during testing
const http = require('http'); // To handle the server

describe('Web app build sanity check', () => {
  let server;
  let port = 0; // Let the system choose a free port

  beforeAll(async () => {
    // Start the server before all tests on a dynamic free port
    server = app.listen(port, () => {
      console.log(`Web app running on port ${server.address().port}`);
    });
  }, 10000); // Increase the timeout to 10 seconds

  afterAll((done) => {
    // Ensure the server is closed after tests
    if (server) {
      server.close(done);
    }
  }, 10000); // Increase the timeout to 10 seconds

  test('should have an app.js file', () => {
    const filePath = path.join(__dirname, 'app.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('should be able to require essential modules', async () => {
    try {
      require('./app'); // Attempt to load the app
      expect(true).toBe(true); // If no error is thrown, the module loaded successfully
    } catch (e) {
      expect(true).toBe(false); // If an error is thrown, fail the test
    }
  });

  test('should respond to / with a status 200', async () => {
    // Make a request to the root endpoint
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  });
});
