import SignInForm from './SignInForm';
import MaskedImage from '@/components/MaskedImage';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

export default function SignIn() {
    return (
        <>
            <MaskedImage />
            <main className="flex flex-col items-center justify-between">
                <SignInForm />
            </main>
        </>
    )
}
