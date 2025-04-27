import { Providers } from "./types";
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

export const Routes = {
    HOME: '/',
    SIGNIN: 'login',
}