# How to

## Configure

Set your environment variable `SLACK_API_TOKENS` to one or many API tokens (comma seperated) from here: https://api.slack.com/custom-integrations/legacy-tokens  
You can use a `.env` file. Check the file `example.env`, add your tokens and rename the file to `.env`.

Optional: change the `const timeout` in `index.js` to change the frequency

## Run

`npm install`

`npm run start` or `node index.js`

