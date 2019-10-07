var AbstractEmailProvider = require('./abstractEmailProvider');

class PostmarkProvider extends AbstractEmailProvider {
    
    constructor(data) {
        super(data);
        this.hostname = 'api.postmarkapp.com';
        this.path = '/email';
        this.apiAuthHeaderKey = 'X-Postmark-Server-Token';
        this.apiAuthHeaderValue = `${process.env.POSTMARK_API_KEY}`;
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

