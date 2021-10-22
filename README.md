# PhantomHand React

Control and automate Nintendo Switch from a browser. A tool developed with React and Arduino.  
This repository contains the React source code for PhantomHand.

## Readme

[PhantomHand](https://github.com/noov-smash/PhantomHand#readme)  
[Getting Started Guide](https://zenn.dev/noov/articles/8afaf41678dfa7)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Local Development

This project assumes a Firebase connection.

If you want to start the project on your local machine, do the following

1. Create a new Firebase project.
2. Create an `.env` file in the root. And rewrite the values to those of your project.

```.env
REACT_APP_FIREBASE_API_KEY="SOME_VALUE"
REACT_APP_FIREBASE_OAUTH_DOMAIN="SOME_VALUE"
REACT_APP_FIREBASE_DATABASE_URL="SOME_VALUE"
REACT_APP_FIREBASE_PROJECT_ID="SOME_VALUE"
REACT_APP_FIREBASE_STORAGE_BUCKET="SOME_VALUE"
REACT_APP_FIREBASE_SENDER_ID="SOME_VALUE"
REACT_APP_FIREBASE_APP_ID="SOME_VALUE"
REACT_APP_BITLY_TOKEN="SOME_VALUE"
NODE_ENV='development'
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
