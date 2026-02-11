import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMICfRH1R5UZFvF_erHN-qSt6eVdsvreU",
  authDomain: "collaborative-canvas-6c9dc.firebaseapp.com",
  projectId: "collaborative-canvas-6c9dc",
  storageBucket: "collaborative-canvas-6c9dc.firebasestorage.app",
  messagingSenderId: "964543873009",
  appId: "1:964543873009:web:d291a929f06f17a5ac0e50",
  measurementId: "G-BVB2R1GR7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with South Africa region and offline persistence
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

// Initialize Auth
export const auth = getAuth(app);

// Create and configure Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const emailProvider = new EmailAuthProvider();
export const analytics = getAnalytics(app);

export default app;
