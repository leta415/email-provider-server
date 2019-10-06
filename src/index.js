import 'dotenv/config';
import express from 'express';

// var sendgrid = require('./sendgrid');
var postmark = require('./postmark');
var sendemail = require('./sendemail');

const app = express();
app.use(express.json());

app.post('/email', (req, res) => {
    console.log('[req.body] ' + JSON.stringify(req.body));
    
    sendemail.sendEmail(req.body);
});

app.listen(3000, () =>
    console.log(`Example app listening on port 3000!`),
);
