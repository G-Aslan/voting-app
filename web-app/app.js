const express = require('express');
const path = require('path'); // Use path module to handle file paths
const app = express();

// Serve static files from the 'web-app' directory
app.use('/web-app', express.static(path.join(__dirname, 'web-app')));

app.get('/', (req, res) => {
    res.status(200).send('Web app is running');
});

const server = app.listen(3000, () => {
    console.log('Web app running on port 3000');
});

// Export both the app and the server to allow the test to control the server
module.exports = { app, server };
