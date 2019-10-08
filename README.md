# Summary
This is a server application that sends a plain text email, allowing the user to choose between 2 different email providers, Sendgrid or Postmark. It takes input data formatted like this:
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
Note that the `body` field can take html, but will be stripped of all html tags before the email is sent.

# How to Install the App

## Prerequisites 
- npm 6.9.0, node 10.16.3 [download here](https://nodejs.org/en/)
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Install Steps
1. `git clone https://github.com/leta415/email-provider-server.git`
2. `cd email-provider-server`
3. Get API keys for the email providers: 
   - Sendgrid: https://sendgrid.com/docs/for-developers/sending-email/api-getting-started/
   - Postmark Server-Token: https://postmarkapp.com/developer/api/overview
4. Create a file called `.env` in the root directory of the repository. Inside the file, define the following variables. To use the Sendgrid email provider, keep the USE_POSTMARK value at 0. Otherwise, use the Postmark email provider, change the value to 1. Keep in mind if you change a value in `.env`, you must rerun `npm start`.

   ```bash
   SENDGRID_API_KEY=<replace_with_your_sendgrid_api_key>
   POSTMARK_API_KEY=<replace_with_your_postmark_api_key>
   USE_POSTMARK=0
   ```
4. `npm install`
5. To kick off the local server, run `npm start`  

# How to Run the App

The app automatically runs on port 3000. Feel free to change it via src/index.js:16.

Once you have `npm start` running, open a new terminal tab and try hitting the server. The following are some example curl commands to do so. Make sure to replace the `to` and `from` fields with approved emails per provider, i.e. Sendgrid, Postmark.

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

# How to Run the Tests

## Unit Tests

`npm test`

## Smoke Tests

### Initial Setup

`routes.js` contains a few end to end tests. In order to run these tests, you need to append the following properties into your `.env` with values for each. Make sure each email you set is an approved to/from email per provider, i.e. Sendgrid, Postmark. 
```bash
TEST_SENDGRID_TO_EMAIL=
TEST_SENDGRID_FROM_EMAIL=
TEST_POSTMARK_TO_EMAIL=
TEST_POSTMARK_FROM_EMAIL=
```
Then to run the tests, run this command in a terminal:
```
./node_modules/mocha/bin/mocha test/routes.js
```

# Languages and Frameworks

I chose to use Express (NodeJS framework) because it seemed like a preferred language as stated in the coding challenge, and with some familiarity with Node, I thought it would be a great exercise for me to refresh my knowledge there. More recently I have been developing in a Python/WSGI codebase, but didn't feel sure enough to be building a Python server from scratch, so abandoned the idea.

# Notes
The bigger idea behind challenge seemed to be to abstract away the common functionalities across multiple email providers, so I made sure to abstract away as much as I could in the class EmailProvider (src/abstractEmailProvider.js), in order to minimize the development efforts of EmailProvider implementations (i.e. SendgridProvider, PostmarkProvider, and any hypothetical future EmailProvider implementations).

If I were to spend more time on this project, I would:
- Figure out why my smoke tests won't properly exit after they have finished running.
- Increase test coverage for the classes inside postmarkProvider.js and sendgridProvider.js.
- Think about if I could refactor the code to be more testable.
- Test a broader range of scenarios and add more specific error logging.
- Figure out a friendlier way to switch between the 2 providers. Or I would develop actual failover logic.
- See if there is a better way to organize the env variables and where they live.
