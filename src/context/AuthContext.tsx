"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { ChildProps, AuthContextType } from '@/utils/types';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { Loading } from '@/components/Loading';
import { useRouter } from 'next/navigation';

const defaultAuthContextValue: AuthContextType = {
    currentUser: null,
    isLoggedIn: false,
    loading: true,
    setLoading: () => {},
    setCurrentUser: () => {},
    setIsLoggedIn: () => {},
    handleSignOut: async () => {}
}

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// Hook to use AuthContext in other components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: ChildProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { push } = useRouter();

    const handleSignOut = async () => {
        await signOut(auth);
        localStorage.removeItem('authUser');
        setCurrentUser(null);
        setIsLoggedIn(false);
        setLoading(false);
        push('/login');
    }
    
    const initUser = async (user: User | null) => {
        if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            // Store important user info in local storage
            const _userInfo = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };

            localStorage.setItem('authUser', JSON.stringify(_userInfo)); // Set cache to current user
        } else {
            // Clean up cache if user is null
            setCurrentUser(null);
            setIsLoggedIn(false);
            localStorage.removeItem('authUser');
        }
        setLoading(false);
    }

    useEffect(() => {
        // Check cache first if user is already logged in
        try {
            const cachedUser = localStorage.getItem('authUser');
            if(cachedUser) {
                setIsLoggedIn(true);
                console.log(cachedUser); // DB
            }
        } catch (error) {
            console.error("Error checking cache:", error);
            alert(error)
        }
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, initUser);
        return () => unsubscribe();
    }, [])

    const value = {
        currentUser,
        isLoggedIn,
        loading,
        setLoading,
        setCurrentUser,
        setIsLoggedIn,
        handleSignOut,
    }

    return (
        <AuthContext.Provider value={ value }>
            { loading ? <Loading /> : children } 
        </AuthContext.Provider>
    )
}