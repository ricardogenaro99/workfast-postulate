// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBVxlgQKu64agZuogmmHStDbgAlv-Vh-ZI",
	authDomain: "workfast-f9c03.firebaseapp.com",
	projectId: "workfast-f9c03",
	storageBucket: "workfast-f9c03.appspot.com",
	messagingSenderId: "651604033106",
	appId: "1:651604033106:web:aecf3c2ac9e63233f0298b",
	measurementId: "G-FQPZHQ13PP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
