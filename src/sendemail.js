import 'dotenv/config';

var striptags = require('striptags');

var sendgrid = require('./sendgrid');
var postmark = require('./postmark');


exports.sendEmail = function(data, res) {
    const validExampleInput = {    
        to: 'fake@example.com',
        to_name: 'Ms. Fake',
        from: 'noreply@uber.com',
        from_name: 'Uber',
        subject: 'A Message from Uber',
        body: '<h1>Your Bill</h1><p>$10</p>'
    }

    // Send back 400 if any of the data input is invalid. Otherwise continue.
    if (!this.validateInput(data)) {
        res.status(400);
        res.send(`Invalid input. Here is an example input: \n\n${JSON.stringify(validExampleInput, null, 4)}`);
    }

    // Strip all html tags
    data.body = striptags(`${data.body}`)

    // Delegate data to the appropriate email provider
    if (`${process.env.USE_POSTMARK}` == '0') {
        sendgrid.sendgridRequest(data);

    } else {
        postmark.postmarkRequest(data);
    }

    return true;
}

exports.validateInput = function(input) {
    if (!this.validateTo(input.to)) {
        console.log('invalid to')
        return false;
    }
    if (!this.validateToName(input.to_name)) {
        console.log('invalid to name')
        return false;
    }
    if (!this.validateFrom(input.from)) {
        console.log('invalid from')
        return false;
    }
    if (!this.validateFromName(input.from_name)) {
        console.log('invalid from name')
        return false;
    }
    if (!this.validateSubject(input.subject)) {
        console.log('invalid subject')
        return false;
    }
    if (!this.validateBody(input.body)) {
        console.log('invalid body')
        return false;
    }

    return true;
}

exports.validateTo = function(to) {
    if (this.isStringNullOrEmpty(to)) {
        return false;
    }
    return this.validateEmail(to);
}

exports.validateToName = function(toName) {
    return !this.isStringNullOrEmpty(toName);
}

exports.validateFrom = function(from) {
    if (this.isStringNullOrEmpty(from)) {
        return false;
    }
    return this.validateEmail(from);
}

exports.validateFromName = function(fromName) {
    return !this.isStringNullOrEmpty(fromName);
}

exports.validateSubject = function(subject) {
    return !this.isStringNullOrEmpty(subject);
}

exports.validateBody = function(body) {
    return !this.isStringNullOrEmpty(body);
}

exports.isStringNullOrEmpty = function(string) {
    if (string == null || string.length === 0) {
        return true;
    }
    return false;
}

exports.validateEmail = function(email) {
    // Regex taken from https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js/52456632
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    return emailRegex.test(email);
}

