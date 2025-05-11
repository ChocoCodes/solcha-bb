import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Routes } from '@/utils/constants';
import { usePathname } from 'next/navigation';

// Hook to check if the user is logged in in every page access - redirect to sign in if not
export const useAuthCheck = () => {
    const { isLoggedIn, currentUser, loading } = useAuth();
    const { push } = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {   
        if(!isLoggedIn && pathname !== Routes.SignIn) {
            push('/login');
        }
    }, [isLoggedIn, currentUser, loading, pathname, push])

    return { isLoggedIn, currentUser, loading };
}