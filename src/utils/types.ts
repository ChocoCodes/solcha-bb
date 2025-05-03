import { User } from 'firebase/auth';
import { SidebarLabelText } from './constants';

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
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    handleSignOut: () => Promise<void>;
}

export interface AuthProviderProps {
    children: React.ReactNode;
}

export type SignInCredentials = {
    email: string;
    password: string;
}

export type Providers = {
    name: string;
    img_link: string;
}

export type SidebarItemProps = {
    label: string;
    func: () => void;
}

export type SidebarRouteKey = keyof typeof SidebarLabelText; // "BULLETIN" | "MAP" | "CHATBOT" | "LOGIN"
export type SidebarLabels = typeof SidebarLabelText[SidebarRouteKey]; // "/" | "/map" | "/chatbot" | "/login"
