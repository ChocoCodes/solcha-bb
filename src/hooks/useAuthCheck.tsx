import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/Loading';
import { Routes } from '@/utils/constants';

// Hook to check if the user is logged in in every page access - redirect to sign in if not
export const useAuthCheck = () => {
    const { isLoggedIn, currentUser, loading } = useAuth();
    const router = useRouter();

    if (loading) return <Loading />;

    useEffect(() => {   
        if(!isLoggedIn || !currentUser) {
            router.push(Routes.SignIn);
        }
    }, [isLoggedIn, currentUser, loading])
}