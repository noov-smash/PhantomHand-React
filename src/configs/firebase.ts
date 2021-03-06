import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_OAUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseDevConfig = {
  apiKey: process.env.REACT_APP_DEV_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_DEV_FIREBASE_OAUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_FIREBASE_STORAGE_BUCKET,
  appId: process.env.REACT_APP_DEV_FIREBASE_APP_ID,
};

firebase.initializeApp(
  process.env.NODE_ENV === "development" ? firebaseDevConfig : firebaseConfig
);

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();
export const analytics = firebase.analytics();
export const storage = firebase.storage();
