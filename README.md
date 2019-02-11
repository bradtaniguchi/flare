# Flare

Flare is an application used to create/study/share flash cards. It is build with Angular
and firebase.

## Developing locally

To develop locally you will need a firebase project, which can be created here:
https://firebase.google.com/

Click on get-started and follow the steps on creating a firebase project on google cloud.

Next you need to add an `env.js` file into the project root with the user credentials.
This is the template you can use:

```javascript
(function(window) {
  window.__env = window.__env || {
    // usually a long hash
    apiKey: '<YOUR API KEY HERE>',
    // usually a url like: <YOUR PROJECT NAME>.firebaseapp.com
    authDomain: '<YOUR AUTH DOMAIN HERE>',
    // usually the same url as above: https://<YOUR PROJECT NAME>.firebaseio.com
    databaseURL: '<YOUR PROJECT DATABASE URL HERE>',
    // usually the project name
    projectId: '<YOUR PROJECTID HERE>'
  };
  window.__env.enableDebug = true;
})(this);
```

You can get most of this information from the general settings (gear in the left side-nav near the top-right)
and scrolling down to the **Add Firebase to your web app** Without adding this file, you wont be able to connect to firebase.

After this is setup, you can run the project with just `npm run dev`

## Contributing

TBD...

## Deployment

This application uses firebase, as such you will need the [firebase-cli](https://github.com/firebase/firebase-tools). Once you have installed the CLI, you needd to configure your own project from the [firebase console](https://console.firebase.google.com/u/0/). Finally, add your environment keys (see above) to the app, build your project using `npm run build`, and then run `firebase deploy` within the `dist` folder built.

**note** the build process will be changed in the future to make a single npm script to build+deploy.


## Testing

You can run unit-tests using `npm run test`. Most tests will be built in the future. 
