import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_aO6cIMKR_IEPpZJGpQSQKkOz7DfyWQU",
  authDomain: "moza-social-media.firebaseapp.com",
  projectId: "moza-social-media",
  storageBucket: "moza-social-media.appspot.com",
  messagingSenderId: "1062062774063",
  appId: "1:1062062774063:web:73582e765aa3718c02b3da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fbAuth = getAuth(app);
