import { auth } from '@/firebase/firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    sendPasswordResetEmail, 
    FacebookAuthProvider,
    UserCredential,
    updateProfile
} from 'firebase/auth';
import { SignInCredentials } from '@/utils/types';
import { addUserCollection } from './addUserCollection';

export const handleCreateUserByEmail = async ({ email, password }: SignInCredentials): Promise<UserCredential> => {
    try {
        // Derive display name from email if login is from email/pass 
        // [Check for Google logins]
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const name = userCredential.user.displayName ?  userCredential.user.displayName : email.split('@')[0];

        if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: name });
            // Store user data in local storage
            localStorage.setItem('authUser', JSON.stringify(userCredential.user));
            // Add user data to users collection in Firestore
            await addUserCollection(userCredential.user);
        }

        return userCredential;
    } catch (error: unknown) {
        const err = error as Error;
        alert(err.message);
        console.error("CreateUserByEmailError: ", err);
        throw error;
    }
};

export const handleEmailSignIn = async ({email, password}: SignInCredentials): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error: unknown) {
        const err = error as { code: string, message: string };
        if (err.code === 'auth/user-not-found') {
            const shouldSignUp = confirm("User not found. Would you like to sign up?");
            if(shouldSignUp) {
                return await handleCreateUserByEmail({email, password});
            }
        }
        alert(err.message);
        console.error("EmailSignInError: ", err);
        throw error;
    }
}

export const handleGoogleSignIn = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then(result => result)
        .catch(error => {
            alert(error.message);
            console.error("Error signing in with Google: ", error);
            throw error;
        });
   
}

export const handleFacebookSignIn = async (): Promise<UserCredential> => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider)
        .then(result => result)
        .catch(error => {
            alert(error.message);
            console.error("Error signing in with Facebook: ", error);
            throw error;
        });
}

export const handlePasswordReset = ({ email }: Pick<SignInCredentials, 'email'>): Promise<void> => sendPasswordResetEmail(auth, email!);
