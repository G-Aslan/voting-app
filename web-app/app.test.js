const request = require('supertest');
const { app, server } = require('./app');  // Assuming the server is exported from app.js

describe('Web app build sanity check', () => {
    it('should have an app.js file', () => {
        // Test for app.js
    });

    it('should be able to require essential modules', () => {
        // Test for essential modules
    });

    it('should respond to / with a status 200', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});

// Clean up by closing the server after all tests are done
afterAll(() => {
    server.close();  // Close the server after tests are done
});
