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
import { FirebaseError } from '@firebase/util';

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

export const handleEmailSignIn = async ({ email, password }: SignInCredentials): Promise<UserCredential> => {
    console.log(`handleEmailSignIn Email: ${email}, Password: ${password}`); // DB
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in: ", userCredential.user);
        return userCredential;
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            if (error.code === 'auth/user-not-found') {
                const shouldSignUp = confirm("User not found. Would you like to sign up?");
                if (shouldSignUp) {
                    return await handleCreateUserByEmail({ email, password });
                }
            }
            alert(error.message);
            console.error("EmailSignInError: ", error);
        } else {
            console.error("Unknown error during sign-in: ", error);
        }
        throw error;
    }
};

export const handleGoogleSignIn = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result as UserCredential;
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            if (error.code === 'auth/popup-closed-by-user') {
                alert("Popup closed by user. Please try again.");
            } else if (error.code === 'auth/popup-blocked') {
                alert("Popup blocked. Please allow popups for this site.");
            } else {
                alert(error.message);
            }
        }
        console.error("Error signing in with Google:", error);
        throw error;
    }
};

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
