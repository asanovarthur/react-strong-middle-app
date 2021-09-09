import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5PK89Ya0rk4waucwfHRkcR1-nXUMr1ZY",
  authDomain: "react-strong-middle-app.firebaseapp.com",
  projectId: "react-strong-middle-app",
  storageBucket: "react-strong-middle-app.appspot.com",
  messagingSenderId: "543325160591",
  appId: "1:543325160591:web:406e4d16f6f66aa07d1cfa",
  measurementId: "G-4TGC9PF05P",
};

const app = firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default app;
