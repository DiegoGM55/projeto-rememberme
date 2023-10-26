import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0mS8z4cb1oOywYSPxsDZnxZ2SC6E7aqI",
  authDomain: "rememberme-7f72d.firebaseapp.com",
  projectId: "rememberme-7f72d",
  storageBucket: "rememberme-7f72d.appspot.com",
  messagingSenderId: "275689953350",
  appId: "1:275689953350:web:a081c7226425c386b9d247"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };

