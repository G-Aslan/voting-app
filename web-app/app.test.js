const request = require('supertest');
const { app, server } = require('./app'); // Import both the app and the server

describe('Web app build sanity check', () => {
  it('should have an app.js file', () => {
    // Check if the app.js file exists
    const fs = require('fs');
    expect(fs.existsSync('app.js')).toBe(true);
  });

  it('should be able to require essential modules', () => {
    // Check if the essential modules can be required
    const express = require('express');
    const path = require('path');
    expect(express).toBeDefined();
    expect(path).toBeDefined();
  });

  it('should respond to / with a status 200', async () => {
    const response = await request(app).get('/');

    // Check if the response status is 200
    expect(response.status).toBe(200);
  });

  // Close the server after all tests are completed to avoid Jest open handle issue
  afterAll(() => {
    server.close();
  });
});
