const request = require('supertest');
const { app } = require('./app'); // Import the app from app.js

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

    // Check if it redirects with a 302 status code and Location header
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/web-app/vote.html'); // Ensure the redirect goes to vote.html
  });
});