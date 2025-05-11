import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebase';
import { 
    collection, 
    query, 
    orderBy,
    getDocs, 
    where,
    Timestamp 
} from 'firebase/firestore';
import { BulletinPost } from '@/utils/types';

// Hook that fetches bulletin posts from Firestore
export const useBulletinPosts = () => {
    const [posts, setPosts] = useState<BulletinPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    const fetchPosts = async () => {
        const oneWeekAgo = Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
        setLoading(true);
        try {
            const postRef = collection(db, 'bulletin_post');
            const q = query(postRef,
                where('date', '>=', oneWeekAgo),
                orderBy('date', 'desc')
            );
            const querySnapshot = await getDocs(q);
            console.log('QuerySnapshot: ', querySnapshot);
            const posts:BulletinPost[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BulletinPost[];
            console.log('Posts: ', posts);
            setPosts(posts);
        } catch (error) {
            const err = error as Error;
            console.error('FetchPostsError: ', err.message);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading, fetchPosts };
}