import 'dotenv/config';

const https = require('https');

exports.postmarkRequest = function(data) {
    // console.log(`[data before write] ${data}`)
    // console.log(`[json stringified data before write] ${JSON.stringify(data)}`)
    const options = {
      hostname: 'api.postmarkapp.com',
      path: '/email',
      method: 'POST',
      headers: {
        'X-Postmark-Server-Token': 'e6564f3a-b8f7-4a62-9405-c69980b537dd',
        'Content-Type': 'application/json'
      }
    }

    // console.log(`[options] ${JSON.stringify(options)}`)

    // const data = {
    //     from: 'leta.he@workday.com',
    //     to: 'leta.he@workday.com',
    //     subject: 'Hey Pris!',
    //     htmlbody: "<strong>Hello</strong> dear Postmark user."
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