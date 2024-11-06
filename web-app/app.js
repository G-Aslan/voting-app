const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Serve the vote.html file when accessing the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'vote.html'));
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Web app running on port ${port}`);
});

module.exports = app;  // Export for testing purposes
