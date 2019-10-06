import 'dotenv/config';

const https = require('https');

exports.postmarkRequest = function(data) {

    // Build Postmark request options
    const options = {
      hostname: 'api.postmarkapp.com',
      path: '/email',
      method: 'POST',
      headers: {
        'X-Postmark-Server-Token': `${process.env.POSTMARK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }

    // Convert data to Postmark input data
    const postmarkInput = {
        from: `${data.from_name} ${data.from}`,
        to: `${data.to_name} ${data.to}`,
        subject: `${data.subject}`,
        textbody: `${data.body}`
    }

    // Make call to Postgrid to send the email
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', (d) => {
        process.stdout.write(d)
      })
    })

    req.on('error', (error) => {
      console.error(error)
    })


    req.write(JSON.stringify(postmarkInput))
    req.end()
}