import SignInForm from '@/components/Login/SignInForm';
import MaskedImage from '@/components/Login/MaskedImage';

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
