import { User } from 'firebase/auth';
import { SidebarLabelText } from './constants';
import { PostCategory } from './constants';
import { DocumentData, DocumentReference, GeoPoint, Timestamp } from 'firebase/firestore';

export interface InputFieldProps {
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

export type IdentityProvider = {
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

export interface MapMarkerProps {
    position: google.maps.LatLngLiteral;
    icon?: string;
    place: string;
    description?: string;   
    pin?: React.ReactNode; // Optional pin element
    distance?: number; // Optional distance of the pin from the user location
}

export interface PlaceResult {
    displayName: string;
    location: {
        lat: number;
        lng: number;
    }
    primaryType?: string;
};

export interface NearbySearchProps {
    center: google.maps.LatLngLiteral;
    radiusM: number;
    types?: string[];
    keyword?: string;
    maxResults?: number;
}

export type Message = {
    sender: "user" | "bot";
    content: string;
    isTyping?: boolean;
}