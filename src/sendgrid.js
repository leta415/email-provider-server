import 'dotenv/config';

const https = require('https');

exports.sendgridRequest = function(data) {

    // Build Sendgrid request options
    const options = {
      hostname: 'api.sendgrid.com',
      path: '/v3/mail/send',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      }
    }

    // Convert data to Sendgrid input data
    const sendgridInputData = {
        personalizations: [{
            to:[{email: `${data.to}`, name:`${data.to_name}`}],
            subject: `${data.subject}`
        }], 
        content: [{
            type: "text/plain", value: `${data.body}`
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

    // Make call to Sendgrid to send the email
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', (d) => {
        process.stdout.write(d)
      })
    })

    req.on('error', (error) => {
      console.error(error)
    })

    req.write(JSON.stringify(sendgridInputData))
    req.end()
}