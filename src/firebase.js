import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAff33MBefu5TzBdARUuM4-ytbF7kgy8j4",
  authDomain: "capaciti-placement-portal.firebaseapp.com",
  projectId: "capaciti-placement-portal",
  storageBucket: "capaciti-placement-portal.firebasestorage.app",
  messagingSenderId: "306181793625",
  appId: "1:306181793625:web:ebeeb205623798dbae4e48",
  measurementId: "G-CC5P2YS5NY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
