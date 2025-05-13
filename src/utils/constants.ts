import { IdentityProvider, SidebarLabels, CategoryKey } from "./types";
import { UserInputData, ImageData } from './types';
// Kanlaon Coords
export const KANLAON_COORDS = {
    lat: 10.41175563185461,
    lng: 123.13299748479464
};

export const PDZ_RADIUS = 6; // in km

export const passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)';

export const GoogleProvider: IdentityProvider = {
    name: 'GOOGLE',
    img_link: '/assets/Google-logo.png',
};

// Sidebar labels
export const SidebarLabelText = {
    BULLETIN: 'Bulletin',
    MAP: 'Map',
    CHATBOT: 'Chatbot',
    SIGNIN: 'SignIn',
} as const;

// Map each label to its corresponding route
export const Routes: Record<SidebarLabels, string> = {
    [SidebarLabelText.BULLETIN]: '/',
    [SidebarLabelText.SIGNIN]: '/login',
    [SidebarLabelText.MAP]: '/map',
    [SidebarLabelText.CHATBOT]: '/chatbot'
};

// Bulletin post categories
export const PostCategory = {
    EMERGENCY: "EMERGENCY",
    EVACUATION: "EVACUATION",
    UPDATES: "UPDATES",
    INFORMATION:  "INFORMATION",
    HELP_WANTED: "HELP_WANTED",
} as const; 

// Colors are defined in CSS files
export const PostCategoryColors: Record<CategoryKey, string> = {
    EMERGENCY: "bg-[#FF3535]",
    EVACUATION: "bg-[#F57C00]",
    UPDATES: "bg-[#3590FF]",
    INFORMATION: "bg-[#7B1F82]",
    HELP_WANTED: "bg-[#388E3C]",
};

export const defaultInputData: UserInputData = {
    title: '',
    description: '',
    category: PostCategory.INFORMATION // set only as default category
}

export const defaultImageData: ImageData = {
    file: null,
    url: ''
}