import 'dotenv/config';

var sendgrid = require('./sendgrid');
var postmark = require('./postmark');

exports.sendEmail = function(data) {
    // data: {    
    //     “to”: “fake@example.com”,
    //     “to_name”: “Ms. Fake”,
    //     “from”: “noreply@uber.com”,
    //     “from_name”: “Uber”,
    //     “subject”: “A Message from Uber”,
    //     “body”: “<h1>Your Bill</h1><p>$10</p>”
    // }

    if (`${process.env.USE_POSTMARK}` == '0') {
        // Convert data to Sendgrid input data
        //TODO strip html

        const sendgridInput = {
            personalizations: [{
                to:[{email: `${data.to}`, name:`${data.to_name}`}],
                subject: `${data.subject}`
            }], 
            content: [{
                type: "text/plain", value: `${data.body}` //TODO change type
            }],
            from: {
                email: `${data.from}`, 
                name: `${data.from_name}`
            },
            reply_to: {
                email: `${data.from}`,
                name: `${data.from_name}`
            }
        }

        console.log(`\n\nsendgridInput: ${JSON.stringify(sendgridInput)}\n\n`);

        sendgrid.sendgridRequest(sendgridInput);

    } else {
        // Convert data to Postmark input data
        //TODO strip html

        const postmarkInput = {
            from: `${data.from_name} ${data.from}`,
            to: `${data.to_name} ${data.to}`,
            subject: `${data.subject}`,
            htmlbody: `${data.body}`
        }

        console.log(`\n\postmarkInput: ${JSON.stringify(postmarkInput)}\n\n`);

        postmark.postmarkRequest(postmarkInput);
    }
}