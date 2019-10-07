var expect  = require('chai').expect;

var PostmarkProvider = require('../../src/postmarkProvider');

describe('convertData()', function() {
    it('should convert data to postmark format', function() {
        const sendemailData = {    
            to: 'fake@example.com',
            to_name: 'Ms. Fake',
            from: 'noreply@uber.com',
            from_name: 'Uber',
            subject: 'A Message from Uber',
            body: '<h1>Your Bill</h1><p>$10</p>'
        };

        const expectedPostmarkData = {
            from: `${sendemailData.from_name} ${sendemailData.from}`,
            to: `${sendemailData.to_name} ${sendemailData.to}`,
            subject: `${sendemailData.subject}`,
            textbody: `${sendemailData.body}`
        };

        var postmarkProvider = new PostmarkProvider(sendemailData);
        var postmarkData = postmarkProvider.convertData();

        expect(postmarkData).to.eql(expectedPostmarkData);
    })
})