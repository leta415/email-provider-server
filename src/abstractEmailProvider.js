var axios = require('axios');


/**
 * This is an abstract class that contains data and functionalities that are common across all email providers.
 */
class EmailProvider {

    /**
     * This is an abstract constructor, not meant to be called directly. Child classes should override
     * this method, and call super(data) from there.
     */
    constructor(data) {
        this.data = data;
    }

    /**
     * This function makes the call to your provider to send the email.
     */
    sendEmail(emailRes) {
        var that = this;

        // Set up the request config
        var requestConfig = {
            url: `${this.path}`,
            method: 'post',
            baseURL: `https:\/\/${this.hostname}`,
            transformRequest: [function (data, headers) {
                return JSON.stringify(that.convertData());
            }],
            data: this.data,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        requestConfig.headers[`${this.apiAuthHeaderKey}`] = `${this.apiAuthHeaderValue}`;


        // Make the call to the email provider
        axios(requestConfig)
            .then(function (response) {
                // handle success
                emailRes.send('\nEmail sent [\\/]\n');
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error(`StatusCode: ${error.response.status} ${JSON.stringify(error.response.data)}`);
                    emailRes.status(error.response.status);
                }
                emailRes.send('\nThere was an error while trying to send the email.\n');
            })
    }

    /**
     * Implement this method to convert the data input to a format that your email provider takes.
     */
    convertData() {
        throw new Error('You have to implement the method convertData in your EmailProvider implementation!');
    }

}

module.exports = EmailProvider;
