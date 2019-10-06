import 'dotenv/config';
import express from 'express';

var sendemail = require('./sendemail');

const app = express();
app.use(express.json());

// Set up routing for /email
app.post('/email', (req, res) => {
    console.log('[req.body] ' + JSON.stringify(req.body));

    sendemail.sendEmail(req.body, res);
});

app.listen(3000, () =>
    console.log(`Example app listening on port 3000!`),
);
