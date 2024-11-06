const fs = require('fs');
const path = require('path');
const { app } = require('./app'); // Assuming your app is an express instance

describe('Web app build sanity check', () => {
  let server;

  beforeAll(() => {
    // Start the server before all tests
    server = app.listen(3000, () => {
      console.log('Web app running on port 3000');
    });
  });

  afterAll((done) => {
    // Close the server after all tests
    if (server) {
      server.close(done);
    }
  });

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
