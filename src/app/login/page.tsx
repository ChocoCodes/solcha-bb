import SignInForm from './SignInForm';
import MaskedImage from '@/components/MaskedImage';
import { Footer } from '@/components/Footer';

export default function SignIn() {
    return (
        <>
            <MaskedImage />
            <h1 className="mt-4 text-4xl font-bold text-center">bantay<br/><span>bulkan</span></h1>
            <main className="flex h-screen flex-col items-center justify-between pt-20">
                <SignInForm />
            </main>
            <Footer />
        </>
    )
}
