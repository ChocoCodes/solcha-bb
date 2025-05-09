import { BulletinPost } from '@/utils/types';
import { db } from '@/firebase/firebase';
import { KANLAON_COORDS } from '@/utils/constants';
import { 
    GeoPoint, 
    Timestamp, 
    doc 
} from 'firebase/firestore';
//     collection, addDoc, 

export const addBulletinPost = async (post: BulletinPost): Promise<void> => {
    const { title, description, date, category, postedBy, postedByUID, imgURL, position } = post;

    // Use firebase server timestamp to get the time of the post
    const currentTimestamp = Timestamp.now();
    // Create a reference to the users document to link the post
    const userRef = doc(db, 'users', postedByUID);
    // Create a reference to the bulletin posts collection
    // const bulletinPostsRef = collection(db, 'bulletin_post');

    const firestoreData = {
        title,
        description: description ?? '',
        date: date ?? currentTimestamp,
        category,
        postedBy,
        postedByUID: userRef,
        position: new GeoPoint((position?.lat ?? KANLAON_COORDS.lat), (position?.lng ?? KANLAON_COORDS.lng)),
        imgURL: imgURL ?? `${process.env.NEXT_PUBLIC_STORAGE_BUCKET as string}/kanlaon.png`
    }

    /*
    try {
        await addDoc(bulletinPostsRef, firestoreData);
        console.log('Bulletin post added successfully');
    } catch (error: any) {
        console.log('FirestoreDataUploadError: ', error);
    }
    
    */
}