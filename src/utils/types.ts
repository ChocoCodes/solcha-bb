import { User } from 'firebase/auth';
import { SidebarLabelText } from './constants';
import { PostCategory } from './constants';
import { DocumentData, DocumentReference, GeoPoint, Timestamp } from 'firebase/firestore';

export type InputFieldProps = {
    type: string;
    name: string;
    id: string;
    value: string;
    func: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    className?: string;
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

export interface ChildProps {
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
    className?: string;
}

export type SidebarRouteKey = keyof typeof SidebarLabelText; // "BULLETIN" | "MAP" | "CHATBOT" | "LOGIN"
export type SidebarLabels = typeof SidebarLabelText[SidebarRouteKey]; // "/" | "/map" | "/chatbot" | "/login"

// Ensures `category` can only be one of the string values from PostCategory.
export type CategoryKey = keyof typeof PostCategory;
type Category = (typeof PostCategory)[CategoryKey]; 

export type BulletinPost = {
    id?: string;
    title: string;
    description?: string;
    date: Timestamp;
    category: Category;
    postedBy: string;
    position?: GeoPoint;
    imgURL?: string;
    postedByUID?: DocumentReference<DocumentData, DocumentData>;
}

export type VolcanoMarkerProps = {
    posts: BulletinPost[];
}

export type UserInputData = {
    title: string;
    description?: string;
    category: CategoryKey;
}

export type ImageData = {
    file: File | null;
    url: string;
}

export type RawPostFormat = {
    userInput: UserInputData;
    image: ImageData;
    postLocation: google.maps.LatLngLiteral;
}

export type MapMarkerProps = {
    position: google.maps.LatLngLiteral;
    icon?: string;
    place: string;
    description?: string;
    pin?: React.ReactNode; // Optional pin element
}