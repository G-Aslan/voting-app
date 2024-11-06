const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');  // Require the path module to handle file paths
const app = express();

app.use(bodyParser.json());

// Serve static files from the 'web-app' directory
app.use('/web-app', express.static(path.join(__dirname, 'web-app')));

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: 'db',
    database: 'votes',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

app.post('/vote', async (req, res) => {
    const vote = req.body.vote;
    try {
        await pool.query('INSERT INTO votes (option) VALUES ($1)', [vote]);
        res.send('Vote added');
    } catch (err) {
        console.error('Error adding vote:', err);
        res.status(500).send({ error: 'Failed to add vote', details: err.message });
    }
});

app.get('/results', async (req, res) => {
    console.log('Results request received');
    try {
        const result = await pool.query('SELECT option, COUNT(*) as count FROM votes GROUP BY option');
        console.log('Query results:', result.rows);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No votes found.' });
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching results:', err);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});

// Start the server and export both app and server
const server = app.listen(3001, () => {
    console.log('Backend running on port 3001');
});

module.exports = { app, server };
