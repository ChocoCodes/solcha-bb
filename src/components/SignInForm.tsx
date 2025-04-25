import { OAuthProviders } from "@/utils/constants";
import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { Loading } from '@/components/Footer';
import { Providers } from '@/utils/types';
import * as Auth from "@/firebase/auth";
import Image from 'next/image';

const OAuthLogin = () => {
    const [loading, setLoading] = useState(false);
    
    const handleOAuthLogin = async (provider: Providers) => {
        setLoading(true);
        try {
            if (provider.name === 'GOOGLE') {
                await Auth.handleGoogleSignIn();
            } else {
                await Auth.handleFacebookSignIn();
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
            { loading ? <Loading /> : OAuthProviders.map(provider => {
                return (
                    <button key={ provider.name } onClick={() => handleOAuthLogin(provider)}>
                        <Image src={ provider.img_link } alt={ provider.name } className="" width={20} height={20} priority/>
                    </button>
                )
            })}
        </div>
    )
    
}

const SignInForm = () => {
    const { isLoggedIn } = useAuth();

}

export default SignInForm;