import { SignInForm, MaskedImage } from '@/components/Login/components'; 

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
