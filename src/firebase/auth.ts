import { auth } from '@/firebase/firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    sendPasswordResetEmail, 
    FacebookAuthProvider,
    UserCredential
} from 'firebase/auth';
import { SignInCredentials } from '@/utils/types';

export const handleCreateUserByEmail = async ({email, password}: SignInCredentials): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => userCredential)
        .catch(error => {
            alert(error.message);
            console.error("Error creating user: ", error);
            throw error;
        });
}

export const handleEmailSignIn = async ({email, password}: SignInCredentials): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            const shouldSignUp = confirm("User not found. Would you like to sign up?");
            if(shouldSignUp) {
                return await handleCreateUserByEmail({email, password});
            }
        }
        alert(error.message);
        console.error("Error signing in with email/password: ", error);
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
