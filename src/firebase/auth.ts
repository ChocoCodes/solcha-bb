import { auth } from '@/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { SignInCredentials } from '@/utils/types';

export const handleCreateUserByEmail = async ({email, password}: SignInCredentials) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const handleSignInByEmail = async ({email, password}: SignInCredentials) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const handleSignByGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
}

export const handleSignOut = () => auth.signOut();
export const handlePasswordReset = ({ email }: Partial<SignInCredentials>) => sendPasswordResetEmail(auth, email!);