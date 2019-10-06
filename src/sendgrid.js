import 'dotenv/config';

const https = require('https');

exports.sendgridRequest = function(data) {
    const options = {
      hostname: 'api.sendgrid.com',
      path: '/v3/mail/send',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      }
    }

    // const data = 
    // {
    //     personalizations:
    //         [{
    //             to:[{email:"leta.he.415@gmail.com", name:"Jenny Doe"}],
    //             subject: "Hello Jenny!"
    //         }], 
    //     content: 
    //         [{
    //             type: "text/plain", value: "Heya!"
    //         }],
    //     from: 
    //         {
    //             email: "letahe0619@gmail.com", 
    //             name:"Sam Smith"
    //         },
    //     reply_to: 
    //         {
    //             email: "letahe0619@gmail.com",
    //             name: "Sam Smith"
    //         }
    // }

    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      // res.setEncoding('utf8');

      res.on('data', (d) => {
        process.stdout.write('[data] ' + d)
      })
    })

    req.on('error', (error) => {
      console.error(error)
    })

    req.write(JSON.stringify(data))
    req.end()
}