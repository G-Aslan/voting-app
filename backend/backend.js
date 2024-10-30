const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

app.use(bodyParser.json());

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: 'db',  // Updated host to match the service name
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
        console.error('Error adding vote:', err); // Log the error
        res.status(500).send({ error: 'Failed to add vote', details: err.message });
    }
});

app.get('/results', async (req, res) => {
    console.log('Results request received');  // Log when the request is received
    try {
        const result = await pool.query('SELECT option, COUNT(*) as count FROM votes GROUP BY option');
        console.log('Query results:', result.rows);  // Log the query results
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No votes found.' });  // Handle no results
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching results:', err);  // Log the error
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});

app.listen(3001, () => {
    console.log('Backend running on port 3001');
});
