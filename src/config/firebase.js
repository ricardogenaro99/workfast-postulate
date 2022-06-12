// Import the functions you need from the SDKs you need
import runtimeEnv from "@mars/heroku-js-runtime-env";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const env = runtimeEnv();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: env.REACT_APP_FIREBASE_API_KEY,
	authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: env.REACT_APP_FIREBASE_APP_ID,
	measurementId: env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
