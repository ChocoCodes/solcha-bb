import SignInForm from './SignInForm';
import MaskedImage from '@/components/MaskedImage';

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
