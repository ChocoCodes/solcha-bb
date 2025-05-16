import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebase';
import {
  collection,
  query,
  orderBy,
  where,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { BulletinPost } from '@/utils/types';

// Hook that listens to bulletin posts in real-time from Firestore
export const useBulletinPosts = () => {
  const [posts, setPosts] = useState<BulletinPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const oneWeekAgo = Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const postRef = collection(db, 'bulletin_post');
    const q = query(
      postRef,
      where('date', '>=', oneWeekAgo),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const mappedPosts: BulletinPost[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BulletinPost[];
        setPosts(mappedPosts);
        setLoading(false);
      },
      error => {
        console.error('RealtimeFetchError:', error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { posts, loading };
};
