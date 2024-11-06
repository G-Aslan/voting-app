const fs = require('fs');
const path = require('path');

// This checks if essential files exist
describe('Web app build sanity check', () => {
  test('should have an app.js file', () => {
    const filePath = path.join(__dirname, 'app.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('should be able to require essential modules', () => {
    try {
      require('./app'); // Attempt to load the app
      expect(true).toBe(true); // If no error is thrown, the module loaded successfully
    } catch (e) {
      expect(true).toBe(false); // If an error is thrown, fail the test
    }
  });
});
