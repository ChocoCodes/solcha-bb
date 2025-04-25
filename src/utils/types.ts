import { User } from 'firebase/auth';

export type InputFieldProps = {
    type: string;
    id: string;
    value: string;
    func: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export interface AuthContextType {
    currentUser: User | null;
    isLoggedIn: boolean;
    loading: boolean;
}

export interface AuthProviderProps {
    children: React.ReactNode;
}

export type SignInCredentials = {
    email: string;
    password: string;
}