var AbstractEmailProvider = require('./abstractEmailProvider');

class SendgridProvider extends AbstractEmailProvider {
    
    constructor(data) {
        super(data);

        // Set up request options for use later. Might be good to extract some of these into the class constants.
        this.options = {
            hostname: 'api.sendgrid.com',
            path: '/v3/mail/send',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
                'Content-Type': 'application/json',
            }
        }
    }

    /**
     * Convert the input data to a valid format for Sendgrid
     */
    convertData() {
        return {
            personalizations: [{
                to:[{email: `${this.data.to}`, name:`${this.data.to_name}`}],
                subject: `${this.data.subject}`
            }], 
            content: [{
                type: "text/plain", value: `${this.data.body}`
            }],
            from: {
                email: `${this.data.from}`, 
                name: `${this.data.from_name}`
            },
            reply_to: {
                email: `${this.data.from}`,
                name: `${this.data.from_name}`
            }
        }
    }

}

module.exports = SendgridProvider;

