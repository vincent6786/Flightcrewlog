import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "AIzaSyBpIa3ggZN5nXbkfoWoss4CaAewDyPmZGA",
  authDomain:        "flightcrewlog.firebaseapp.com",
  projectId:         "flightcrewlog",
  storageBucket:     "flightcrewlog.firebasestorage.app",
  messagingSenderId: "660416069831",
  appId:             "1:660416069831:web:97e20f9f186ff8d305bee2"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("✅ Firebase initialized — FlightCrewlog");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
  console.error("Check your Firebase configuration and make sure Firestore is enabled");
}

export { db };
