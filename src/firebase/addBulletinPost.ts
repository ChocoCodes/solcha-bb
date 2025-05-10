import { BulletinPost } from '@/utils/types';
import { db } from '@/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';  

export const addBulletinPost = async (post: BulletinPost): Promise<void> => {
    // Create a reference to the bulletin posts collection
    const bulletinPostsRef = collection(db, 'bulletin_post');
    // Upload to Firestore
    try {
        await addDoc(bulletinPostsRef, post);
        console.log('Bulletin post added successfully');
    } catch (error: any) {
        console.log('FirestoreDataUploadError: ', error);
    }
}