import { doc, GeoPoint, Timestamp } from 'firebase/firestore';
import { PostCategoryColors } from './constants';
import { BulletinPost, CategoryKey, RawPostFormat } from './types';
import { db } from '@/firebase/firebase';

// Retrieve user cache from local storage
export const getUserCache = () => {
    return localStorage.getItem('authUser') ?
        JSON.parse(localStorage.getItem('authUser') as string) 
        : null; 
}

// Format bulletin post to BulletinPost type
export const formatPost = ({ userInput, image, postLocation }: RawPostFormat): BulletinPost => {
    const cachedUserInfo = getUserCache();
    const user = { ...userInput };
    const { url } = image;
    const { lat, lng } = postLocation;
    const position = new GeoPoint(lat, lng);
    const currentTimestamp = Timestamp.now();
    // Create a reference to the users document to link the post
    const userRef = doc(db, 'users', cachedUserInfo.uid);
    return {
        ...user,
        date: currentTimestamp,
        postedBy: cachedUserInfo.displayName,
        postedByUID: userRef,
        position: position,
        imgURL: url
    };
};

// Calculate the difference in hours between the current time and the post date
export const getHoursAgo = (date: Timestamp): number => {
    const currentTime = Timestamp.now();
    const difference = currentTime.seconds - date.seconds;
    return Math.floor(difference / 3600);
}

// Get color equivalent of category
export const getCategoryColor = (category: CategoryKey): string => PostCategoryColors[category]

export const extractHexColor = (color: string): string => {
    const hex = color.match(/\[#([0-9a-fA-F]{6})\]/);
    return hex ? `#${hex[1]}` : '#000000';
}
