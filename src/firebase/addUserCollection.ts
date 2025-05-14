import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { User } from 'firebase/auth';

export const addUserCollection = async (user: User) => {
    if(!user) return;
    // Create a reference to the users collection and set the document ID to user.uid
    const userRef = doc(db, 'users', user.uid);
    try {
        // set the user data in the Firestore document
        await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName,
        })
    } catch (error: unknown) {
        const err = error as Error;
        console.error('FirestoreUserUploadError: ', err.message);
    }
}