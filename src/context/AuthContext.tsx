import { useState, useEffect, createContext, useContext } from 'react';
import { AuthProviderProps, AuthContextType } from '@/utils/types';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Loading } from '@/components/Footer';

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    isLoggedIn: false,
    loading: true,
});

// Hook to use AuthContext in other components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check cache first if user is already logged in
        const cachedUser = localStorage.getItem('authUser');
        if(cachedUser) {
            setCurrentUser(JSON.parse(cachedUser));
            setIsLoggedIn(true);
            setLoading(false);
        }
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, initUser);
        return unsubscribe;
    }, [])

    const initUser = async (user: User | null) => {
        if (user) {
            setCurrentUser({ ...user });
            setIsLoggedIn(true);
            localStorage.setItem('authUser', JSON.stringify(user)); // Set cache to current user
        } else {
            // Clean up cache if user is null
            localStorage.removeItem('authUser');
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        isLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={ value }>
            { loading ? <Loading /> : children } 
        </AuthContext.Provider>
    )
}