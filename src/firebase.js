import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9CnLNi-u84JL7B250gIOAYE2E1hUU9TA",
  authDomain: "portal-a878c.firebaseapp.com",
  projectId: "portal-a878c",
  storageBucket: "portal-a878c.appspot.com",
  messagingSenderId: "436044585193",
  appId: "1:436044585193:web:cc2050be51bbb6b200b878",
  measurementId: "G-4C5501WT1M"
};

let app;
let analytics;
let auth;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
}

export { analytics, auth };