// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrTMhuNUzfWP7SpXQWkvJ08bDNVc9i43Y",
  authDomain: "mern-blog-66495.firebaseapp.com",
  projectId: "mern-blog-66495",
  storageBucket: "mern-blog-66495.appspot.com",
  messagingSenderId: "736335848426",
  appId: "1:736335848426:web:66c8f9c3cf84d20ae68893",
  measurementId: "G-RMTVSG1Q0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;