# Update DEV Post Title Programmatically.

This sample shows how to automatically update a [DEV post](https://dev.to/wobsoriano/this-post-has-22-views-5ed6) title in the background.

Further reading:

- DEV API: https://docs.dev.to/api/
- Firebase SDK: https://firebase.google.com/docs/functions

## Functions Code

See file [functions/index.js](functions/index.js) for the code.

The dependencies are listed in [functions/package.json](functions/package.json).

## Deploy and test

To test this integration:

- Create a Firebase Project using the [Firebase Developer Console](https://console.firebase.google.com)
- Enable billing on your project by switching to the Blaze or Flame plan. See [pricing](https://firebase.google.com/pricing/) for more details. This is required to be able to do requests to non-Google services.
- Configure this sample to use your project using `firebase use --add` and select your project.
- Install dependencies locally by running: `cd functions; npm install; cd -`
- [Get a DEV API key](https://dev.to/settings/account)
- Set the `dev.api_key` and `dev.post_id` environment variables for your project. For this use:
  ```bash
  firebase functions:config:set dev.api_key="YOUR_DEV_API_KEY" dev.post_id="DEV_POST_ID_TO_UPDATE"
  ```
- Deploy your project using `firebase deploy --only functions`
