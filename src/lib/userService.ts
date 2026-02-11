import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: any;
  lastLogin: any;
  canvases?: string[];
  teamId?: string;
  role?: string;
}

// Save user to Firestore after signup
export const saveUserToFirestore = async (user: User) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      // New user - create profile
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        canvases: [],
        role: 'member'
      };
      
      await setDoc(userRef, userProfile);
      console.log('✅ User saved to Firestore');
    } else {
      // Existing user - update last login
      await updateDoc(userRef, {
        lastLogin: serverTimestamp()
      });
      console.log('✅ User last login updated');
    }
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};
