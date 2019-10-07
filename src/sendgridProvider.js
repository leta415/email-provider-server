var AbstractEmailProvider = require('./abstractEmailProvider');

class SendgridProvider extends AbstractEmailProvider {
    
    constructor(data) {
        super(data);
        this.hostname = 'api.sendgrid.com';
        this.path = '/v3/mail/send';
        this.apiAuthHeaderKey = 'Authorization';
        this.apiAuthHeaderValue = `Bearer ${process.env.SENDGRID_API_KEY}`;
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

