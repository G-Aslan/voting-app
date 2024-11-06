const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

const server = app.listen(3000, () => {
    console.log('Web app running on port 3000');
});

// Export both the app and the server to allow the test to control the server
module.exports = { app, server };
