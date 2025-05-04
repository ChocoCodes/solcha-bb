import { Providers, SidebarLabels } from "./types";


export const passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)';

export const OAuthProviders: Providers[] = [
    {
        name: 'GOOGLE',
        img_link: '/assets/Google-logo.png',
    },
    {
        name: 'FACEBOOK',
        img_link: '/assets/Facebook-logo.png',
    }
];

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

