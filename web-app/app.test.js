const fs = require('fs');
const path = require('path');
const { app } = require('./app'); // Ensure correct import

describe('Web app build sanity check', () => {
  let server;

  beforeAll(async () => {
    // Start the server before all tests
    server = app.listen(3000, () => {
      console.log('Web app running on port 3000');
    });
  }, 10000); // Increase the timeout

  afterAll((done) => {
    // Close the server after all tests
    if (server) {
      server.close(done);
    }
  }, 10000); // Increase the timeout

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
});
