import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { getUserCache } from '@/utils/utils';



export const uploadImage = async (file: File | null): Promise<string> => {
    if(!file) {
        return `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/kanlaon.png`;
    }
    // Create a unique filename using UUID
    const filename = `${v4()}-${file.name}`;
    // Access user info from local storage
    const currentUser = getUserCache();
    console.log('currentUser: ', currentUser);
    console.log('type: ', typeof currentUser);
    if(!currentUser) {
        throw new Error('FileUploadError: User is not logged in.');
    }
    // Create a reference to the storage location where the file is uploaded
    const storageRef = ref(storage, `bulletin_posts/${currentUser.uid}/${filename}`);
    
    // Upload the file to storage and return the download URL
    try {
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
    } catch (error: any) {
        console.error('FileUploadError: ', error.message);
        throw new Error('FileUploadError: Failed to upload file.');
    }
}