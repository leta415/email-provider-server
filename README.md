# How to Install the App

Make sure these requirements are set up: [node & npm](https://nodejs.org/en/), [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

1. `git clone https://github.com/leta415/email-provider-server.git`
2. `cd email-provider-server`
3. Create a file called `.env` in the root directory of the repository. Inside the file, define the following variables. To use the Sendgrid email provider, keep the USE_POSTMARK value at 0. Otherwise, use the Postmark email provider, change the value to 1.

   ```bash
   SENDGRID_API_KEY=<replace_with_your_sendgrid_api_key>
   POSTMARK_API_KEY=<replace_with_your_postmark_api_key>
   USE_POSTMARK=0
   ```
4. `npm install`
5. To kick off the local server, run `npm start`  

# How to Run the App

The app automatically runs on port 3000. Feel free to change it via src/index.js:16.

The app expects JSON input data in the format:

```javascript
{    
   to: 'fake@example.com',
   to_name: 'Ms. Fake',
   from: 'noreply@uber.com',
   from_name: 'Uber',
   subject: 'A Message from Uber',
   body: '<h1>Your Bill</h1><p>$10</p>'
}
```

Example curl command:

```
curl "http://localhost:3000/email" \
-X POST \
-H "Content-Type: application/json" \
-d '{"to":"jane.doe@gmail.com","to_name":"Jane Doe","from":"sam.smith@gmail.com","from_name":"Sam Smith","subject":"Hello there","body":"<strong>Dear Jane,</strong> hi, how are you?"}'
```

# Languages and Frameworks

I chose to use Express (NodeJS framework) because it seemed like a preferred language as stated in the coding challenge, and with some familiarity with Node, I thought it would be a great exercise for me to refresh my knowledge there. More recently I have been developing in a Python/WSGI codebase, but didn't feel sure enough to be building a Python server from scratch, so abandoned the idea.

# Notes
