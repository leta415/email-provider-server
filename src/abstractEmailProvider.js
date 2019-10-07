var https = require('https');


class EmailProvider {

    constructor(data) {
        this.data = data;
        console.log(`EmailProvider constructor data: ${JSON.stringify(this.data)}`)
    }

    /**
     * This function makes the call to your provider to send the email.
     */
    sendEmail(res) {

        // Set up request options.
        var options = {
            hostname: `${this.hostname}`,
            path: `${this.path}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        options.headers[`${this.apiAuthHeaderKey}`] = `${this.apiAuthHeaderValue}`;

        // Make the request to the email provider.
        const req = https.request(options, (res) => {
          console.log(`statusCode: ${res.statusCode}`)

          res.on('data', (d) => {
            process.stdout.write(d)
          })
        })

        req.on('error', (error) => {
          console.error(error)
        })

        req.write(JSON.stringify(this.convertData()))
        req.end()
    }

    /**
     * Implement this method to convert the data input to a format that your email provider takes.
     */
    convertData() {
        throw new Error('You have to implement the method convertData in your EmailProvider implementation!');
    }

}

module.exports = EmailProvider;
