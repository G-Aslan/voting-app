const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const backendUrl = 'http://backend-svc:80';

app.use(bodyParser.json());

app.post('/vote', (req, res) => {
    const vote = req.body.vote;
    axios.post('http://ac681fbb190314f11a037e5f78fd5c3e-242847692.us-east-1.elb.amazonaws.com/vote', { vote })
        .then(() => res.send('Vote received'))
        .catch(err => res.status(500).send(err));
});

app.get('/results', (req, res) => {
    axios.get('http://ac681fbb190314f11a037e5f78fd5c3e-242847692.us-east-1.elb.amazonaws.com/results')
        .then(response => res.json(response.data))
        .catch(err => res.status(500).send(err));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'vote.html'));
});

// Export the app object so it can be imported in tests
module.exports = { app };

app.listen(3000, () => {
    console.log('Web app running on port 3000');
});
