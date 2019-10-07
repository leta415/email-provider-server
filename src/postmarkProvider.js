var AbstractEmailProvider = require('./abstractEmailProvider');

class PostmarkProvider extends AbstractEmailProvider {
    
    constructor(data) {
        super(data);

        // Set up request options for use later. Might be good to extract some of these into class constants.
        this.options = {
            hostname: 'api.postmarkapp.com',
            path: '/email',
            method: 'POST',
            headers: {
                'X-Postmark-Server-Token': `${process.env.POSTMARK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    }

    /**
     * Convert the input data to a valid format for Postmark
     */
    convertData() {
        return {
            from: `${this.data.from_name} ${this.data.from}`,
            to: `${this.data.to_name} ${this.data.to}`,
            subject: `${this.data.subject}`,
            textbody: `${this.data.body}`
        }
    }

}

module.exports = PostmarkProvider;

