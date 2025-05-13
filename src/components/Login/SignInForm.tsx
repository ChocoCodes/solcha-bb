"use client";

import { GoogleProvider } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";
import { Loading } from '@/components/Loading';
import * as Auth from "@/firebase/auth";
import { getAdditionalUserInfo  } from 'firebase/auth';
import Image from 'next/image';
import { useState } from 'react';
import InputField from '@/components/InputField';
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { addUserCollection } from "@/firebase/addUserCollection";
import { useRouter } from 'next/navigation';

const OAuthLoginIcons =  () => {
    const { loading, setCurrentUser, setIsLoggedIn, setLoading } = useAuth();
    const { push } = useRouter();

    if(loading) return <Loading />;

    const handleOAuthLogin = async () => {
        setLoading(true);
        try {
            const result = await Auth.handleGoogleSignIn();
            const user = result.user;
            // Get additional user info from the resutl
            const additionalInfo = getAdditionalUserInfo(result);
            const isNewUser = additionalInfo?.isNewUser;
            if(user) {
                setCurrentUser(user);
                setIsLoggedIn(true);
                // Store user data in local storage
                localStorage.setItem('authUser', JSON.stringify(user));
                // Check if the user is newly created and add user data to users collection in Firestore
                if (isNewUser) {
                    await addUserCollection(user);
                }
            }
            push('/');
        } catch (error) {
            console.error("OAuthLoginError:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-2 justify-center items-center p-4 rounded-md bg-clear border-2 border-white/60 hover:cursor-pointer">
            <button 
                key={ GoogleProvider.name } 
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    handleOAuthLogin();
                }}
                className="hover:cursor-pointer"
            >
                <Image src={ GoogleProvider.img_link } alt={ GoogleProvider.name } className="fill-white/60" width={30} height={30} priority/>
            </button>
        </div>
    )
}

const SignInForm = () => {
    const { loading } = useAuthCheck();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useAuth();
    const { push } = useRouter();

    if(loading) return <Loading />;

    const handleEmailSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(`Email: ${email}, Password: ${password}`); // DB
        e.preventDefault();
        Auth.handleEmailSignIn({email, password})
            .then(_user => {
                setCurrentUser(_user?.user);
                push('/');
            })
            .catch(error => {
                console.error("Error logging in via email/pass");
                alert(error.message);
                throw error;
            })
    }

    const handleForgotPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Auth.handlePasswordReset({ email })
            .then(() => alert("Password reset email sent. Please check your inbox."))
            .catch(error => {
                console.error("Error sending password reset email:", error);
                alert(error.message);
                throw error;
            })
    }

    return (
        <div className="flex flex-col gap-3 justify-center items-center h-60vh px-6 py-8 font-poppins">
            <h1 className="font-normal text-2xl text-lava pb-3 text-center">SIGN IN</h1>
            <form className="flex flex-col gap-3 items-center justify-center">
                <div className="flex flex-col gap-4 w-80 px-3">
                    <InputField 
                        type="email" 
                        placeholder="Email" 
                        name={"email"}
                        id="email" 
                        value={ email } 
                        func={(e) => setEmail(e.target.value)}
                    />
                    <InputField 
                        type="password" 
                        placeholder="Password" 
                        name={"password"}
                        id="password" 
                        value={ password } 
                        func={(e) => setPassword(e.target.value)} 
                    />
                    <button 
                        type="submit" 
                        onClick={ handleEmailSignIn } 
                        className="w-full h-10 px-3 mt-4 mr-auto text-center bg-ivory rounded-md text-charcoal"
                    >
                        Enter
                    </button>
                </div>
                <button onClick={ handleForgotPassword } className="border-none text-white-clear text-[12px] cursor-pointer hover:underline text-sm pt-1 lg:text-lg">Forgot Password?</button>
                <p className="text-center text-xs lg:text-lg">Or sign in with:</p>
                <OAuthLoginIcons />
            </form>
        </div>
    );
}

export default SignInForm;