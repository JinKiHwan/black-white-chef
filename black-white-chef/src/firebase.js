// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDw9cSZojCs1mp6LSayHzntIZh0tXueuH8',
  authDomain: 'black-white-chef.firebaseapp.com',
  projectId: 'black-white-chef',
  storageBucket: 'black-white-chef.firebasestorage.app',
  messagingSenderId: '610174750778',
  appId: '1:610174750778:web:599e8b6b235c31720c2503',
  measurementId: 'G-7L69X7HX16',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
