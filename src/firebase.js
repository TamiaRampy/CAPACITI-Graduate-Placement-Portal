import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Already imported

const firebaseConfig = {
  apiKey: "AIzaSyD9CnLNi-u84JL7B250gIOAYE2E1hUU9TA",
  authDomain: "portal-a878c.firebaseapp.com",
  projectId: "portal-a878c",
  storageBucket: "portal-a878c.appspot.com",
  messagingSenderId: "436044585193",
  appId: "1:436044585193:web:cc2050be51bbb6b200b878",
  measurementId: "G-4C5501WT1M",
};

let app;
let analytics;
let auth;
let db;
let storage; // ✅ Declare storage

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app); // ✅ Initialize storage
}

export { analytics, auth, db, storage }; // ✅ Export storage too