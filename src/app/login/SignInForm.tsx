"use client";

import { OAuthProviders } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";
import { Loading } from '@/components/Loading';
import { Providers } from '@/utils/types';
import * as Auth from "@/firebase/auth";
import Image from 'next/image';
import { auth } from '@/firebase/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import InputField from '@/components/InputField';
import { Routes } from '@/utils/constants';

const OAuthLoginIcons =  () => {
    const { loading, setCurrentUser, setIsLoggedIn, setLoading } = useAuth();

    const handleOAuthLogin = async (provider: Providers) => {
        setLoading(true);
        try {
            if (provider.name === 'GOOGLE') {
                await Auth.handleGoogleSignIn();
            } else {
                await Auth.handleFacebookSignIn();
            }
            const user = auth.currentUser;
            if(user) {
                setCurrentUser(user);
                setIsLoggedIn(true);
                localStorage.setItem('authUser', JSON.stringify(user));
                // TODO: Add user data to users collection in Firestore
            }
        } catch (error) {
            console.error("Error during OAuth login:", error);
            // TODO: Add ShadCN Toast to display error
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-2 justify-center items-center">
            {OAuthProviders.map(provider => {
                return (
                    <button 
                        key={ provider.name } 
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            handleOAuthLogin(provider);
                        }}
                    >
                        <Image src={ provider.img_link } alt={ provider.name } className="" width={20} height={20} priority/>
                    </button>
                )
            })}
        </div>
    )
}

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser, isLoggedIn, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if(isLoggedIn && pathname !== Routes.Bulletin) {
            router.push('/');
        } else if(!isLoggedIn && pathname !== Routes.SignIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router, loading]);

    if(loading) return <Loading />;

    const handleEmailSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(`Email: ${email}, Password: ${password}`);
        e.preventDefault();
        Auth.handleEmailSignIn({email, password})
            .then(_user => setCurrentUser(_user?.user))
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
        <div className="flex flex-col gap-6 justify-center items-center h-60vh">
            <h1>Sign In</h1>
            <form className="flex flex-col gap-4">
                <InputField 
                    type="email" 
                    placeholder="Email" 
                    id="email" 
                    value={ email } 
                    func={(e) => setEmail(e.target.value)}
                />
                <InputField 
                    type="password" 
                    placeholder="Password" 
                    id="password" 
                    value={ password } 
                    func={(e) => setPassword(e.target.value)} 
                />
                <button type="submit" onClick={ handleEmailSignIn } className="w-50 h-10 bg-red-500">Sign in with Email</button>
                <button onClick={ handleForgotPassword } className="bg-transparent border-none text-white cursor-pointer hover:underline">Forgot Password?</button>
                <hr className="w-50 h-[4px] bg-red-500 rounded border-none"/>
                <p className="text-center">Or sign in with:</p>
                <OAuthLoginIcons />
            </form>
        </div>
    );
}

export default SignInForm;