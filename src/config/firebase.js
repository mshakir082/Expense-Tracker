// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0JD8NgElVgSseXA1on8uxMQRQvGPEKWw",
  authDomain: "expense-tracker-f31f7.firebaseapp.com",
  projectId: "expense-tracker-f31f7",
  storageBucket: "expense-tracker-f31f7.appspot.com",
  messagingSenderId: "1075054533138",
  appId: "1:1075054533138:web:9a21d74401ca14a37096cb",
  measurementId: "G-QXREREYYYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
