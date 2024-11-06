const express = require('express');
const app = express();
const port = 3000;

// Basic route to test
app.get('/', (req, res) => {
  // If you expect a redirect, you can uncomment the following line
  // return res.redirect(302, '/login');
  
  res.status(200).send('Hello World');
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Web app running on port ${port}`);
});

module.exports = app;  // Export for testing purposes
