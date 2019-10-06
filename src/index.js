import 'dotenv/config';
import express from 'express';

var sendemail = require('./sendemail');

const app = express();
app.use(express.json());

/**
 * Set up routing for /email
 */
app.post('/email', (req, res) => {
    sendemail.sendEmail(req.body, res);
    res.send('Email Sent!');
});

app.listen(3000, () =>
    console.log(`Email Provider Server listening on port 3000!`),
);
