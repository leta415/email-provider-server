require('dotenv').config()

var striptags = require('striptags');
var emailValidator = require("email-validator");

var SendgridProvider = require('./sendgridProvider');
var PostmarkProvider = require('./postmarkProvider');

/**
 * This method the delegator for sending email. It will delegate the task to an appropriate email provider.
 *
 * @param data Input data to send the email with. Example:
 *               {
 *                  to: 'sallypark@hotmail.com',
 *                  to_name: 'Sally Park',
 *                  from: 'joeshmoe@yahoo.net',
 *                  from_name: 'joeshmoe',
 *                  subject: 'Hello There',
 *                  body: '<h1>Hey!</h1> How are you?'
 *                }
 */
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
        res.send(`\n\nInvalid input. Here is an example input: \n\n${JSON.stringify(validExampleInput, null, 4)}\n`);
        return;
    }

    // Strip all html tags
    data.body = striptags(`${data.body}`)

    // Delegate data to the appropriate email provider
    if (`${process.env.USE_POSTMARK}` == '0') {
        var sendgridProvider = new SendgridProvider(data);
        sendgridProvider.sendEmail(res);

    } else {
        var postmarkProvider = new PostmarkProvider(data);
        postmarkProvider.sendEmail(res);
    }
}

/**
 * Validate the data input.
 *
 * @param input The input data coming in from /email.
 * @return {boolean} Returns true if all the data input is valid, false otherwise.
 */
exports.validateInput = function(input) {
    if (!this.validateTo(input.to)) {
        return false;
    }
    if (!this.validateToName(input.to_name)) {
        return false;
    }
    if (!this.validateFrom(input.from)) {
        return false;
    }
    if (!this.validateFromName(input.from_name)) {
        return false;
    }
    if (!this.validateSubject(input.subject)) {
        return false;
    }
    if (!this.validateBody(input.body)) {
        return false;
    }

    return true;
}

/**
 * Validate the 'to' field.
 *
 * @param The string value of the 'to' field.
 * @return {boolean} Returns true if the 'to' value is a nonempty string and a valid email address, false otherwise.
 */
exports.validateTo = function(to) {
    if (this.isStringNullOrEmpty(to)) {
        return false;
    }
    return emailValidator.validate(to);
}

/**
 * Validate the 'to_name' field.
 *
 * @param The string value of the 'to_name' field.
 * @return {boolean} Returns true if the 'to_name' value is a nonempty string, false otherwise.
 */
exports.validateToName = function(toName) {
    return !this.isStringNullOrEmpty(toName);
}

/**
 * Validate the 'from' field.
 *
 * @param The string value of the 'from' field.
 * @return {boolean} Returns true if the 'from' value is a nonempty string and a valid email address, false otherwise.
 */
exports.validateFrom = function(from) {
    if (this.isStringNullOrEmpty(from)) {
        return false;
    }
    return emailValidator.validate(from);
}

/**
 * Validate the 'from_name' field.
 *
 * @param The string value of the 'from_name' field.
 * @return {boolean} Returns true if the 'from_name' value is a nonempty string, false otherwise.
 */
exports.validateFromName = function(fromName) {
    return !this.isStringNullOrEmpty(fromName);
}

/**
 * Validate the 'subject' field.
 *
 * @param The string value of the 'subject' field.
 * @return {boolean} Returns true if the 'subject' value is a nonempty string, false otherwise.
 */
exports.validateSubject = function(subject) {
    return !this.isStringNullOrEmpty(subject);
}

/**
 * Validate the 'body' field.
 *
 * @param The string value of the 'body' field.
 * @return {boolean} Returns true if the 'body' value is a nonempty string, false otherwise.
 */
exports.validateBody = function(body) {
    return !this.isStringNullOrEmpty(body);
}

exports.isStringNullOrEmpty = function(string) {
    if (string == null || string.length === 0) {
        return true;
    }
    return false;
}