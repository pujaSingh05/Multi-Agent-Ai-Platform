// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "aichattool-b4f0c.firebaseapp.com",
    projectId: "aichattool-b4f0c",
    storageBucket: "aichattool-b4f0c.firebasestorage.app",
    messagingSenderId: "295869172519",
    appId: "1:295869172519:web:dc58683bc5969db874b702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();