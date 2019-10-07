var expect  = require('chai').expect;

var SendgridProvider = require('../../src/sendgridProvider');

describe('convertData()', function() {
    it('should convert data to sendgrid format', function() {
        const sendemailData = {    
            to: 'fake@example.com',
            to_name: 'Ms. Fake',
            from: 'noreply@uber.com',
            from_name: 'Uber',
            subject: 'A Message from Uber',
            body: '<h1>Your Bill</h1><p>$10</p>'
        };

        const expectedSendgridData = {
            personalizations: [{
                to:[{email: `${sendemailData.to}`, name:`${sendemailData.to_name}`}],
                subject: `${sendemailData.subject}`
            }], 
            content: [{
                type: "text/plain", value: `${sendemailData.body}`
            }],
            from: {
                email: `${sendemailData.from}`, 
                name: `${sendemailData.from_name}`
            },
            reply_to: {
                email: `${sendemailData.from}`,
                name: `${sendemailData.from_name}`
            }
        };

        var sendgridProvider = new SendgridProvider(sendemailData);
        var sendgridData = sendgridProvider.convertData();

        expect(sendgridData).to.eql(expectedSendgridData);
    })
})