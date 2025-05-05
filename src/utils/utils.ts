import { PostCategory, PostCategoryColors } from './constants';
import { BulletinPost, CategoryKey } from './types';

// Retrieve user cache from local storage
export const getUserCache = () => {
    return localStorage.getItem('authUser') ?
        JSON.parse(localStorage.getItem('authUser') as string) 
        : null; 
}

// Format bulletin post to BulletinPost type
export const formatPost = (): void => {

}

// Get color equivalent of category
export const getCategoryColor = (category: CategoryKey): string => PostCategoryColors[category]