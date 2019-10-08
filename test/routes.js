require('dotenv').config()

const request = require('supertest');
const express = require('express');
const app = require('../src/index');

describe('POST /email', function() {
    after(function() { 
        process.exit(); // Added this because the tests suite wouldn't exit when done running
    }); 

    // Increase timeout from the default 2000ms to give the post requests buffer time
    this.timeout(15000);

    it('valid input using Sendgrid responds with 200', function(done) {
        process.env.USE_POSTMARK = '0';

        request(app)
            .post('/email')
            .send({
                to: `${process.env.TEST_SENDGRID_TO_EMAIL}`,
                to_name: "Jane Doe",
                from: `${process.env.TEST_SENDGRID_FROM_EMAIL}`,
                from_name: "Sam Smith",
                subject: "Hello there",
                body: "Dear Jane, hi, how are you?"
            }) 
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('invalid \'to\' email using Sendgrid responds with 400', function(done) {
        process.env.USE_POSTMARK = '0';

        request(app)
            .post('/email')
            .send({
                to: "INVALID_TO_EMAIL",
                to_name: "Jane Doe",
                from: `${process.env.TEST_SENDGRID_FROM_EMAIL}`,
                from_name: "Sam Smith",
                subject: "Hello there",
                body: "Dear Jane, hi, how are you?"
            }) 
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('valid input using Postmark email responds with 200', function(done) {
        process.env.USE_POSTMARK = '1';

        request(app)
            .post('/email')
            .send({
                to: "leta.he@workday.com",
                to_name: "Jane Doe",
                from: `${process.env.TEST_POSTMARK_FROM_EMAIL}`,
                from_name: "Sam Smith",
                subject: "Hello there",
                body: "Dear Jane, hi, how are you?"
            }) 
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('invalid \'from\' email using Postmark responds with 400', function(done) {
        process.env.USE_POSTMARK = '1';

        request(app)
            .post('/email')
            .send({
                to: `${process.env.TEST_POSTMARK_TO_EMAIL}`,
                to_name: "Jane Doe",
                from: "INVALID_FROM_EMAIL",
                from_name: "Sam Smith",
                subject: "Hello there",
                body: "Dear Jane, hi, how are you?"
            }) 
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('valid input using Postmark with html body responds with 200', function(done) {
        process.env.USE_POSTMARK = '1';

        request(app)
            .post('/email')
            .send({
                to: `${process.env.TEST_POSTMARK_TO_EMAIL}`,
                to_name: "Jane Doe",
                from: `${process.env.TEST_POSTMARK_FROM_EMAIL}`,
                from_name: "Sam Smith",
                subject: "Hello there",
                body: "<h1><strong>Dear Jane,</strong> hi, how are you?</h1>"
            }) 
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});