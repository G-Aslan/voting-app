const fs = require('fs');
const path = require('path');

// This checks if essential files exist
describe('Backend build sanity check', () => {
  test('should have a backend.js file', () => {
    const filePath = path.join(__dirname, 'backend.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('should be able to require essential modules', () => {
    try {
      require('./backend'); // Attempt to load the backend module
      expect(true).toBe(true); // If no error is thrown, the module loaded successfully
    } catch (e) {
      expect(true).toBe(false); // If an error is thrown, fail the test
    }
  });
});
