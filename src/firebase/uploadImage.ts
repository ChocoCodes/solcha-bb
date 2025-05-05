import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { getUserCache } from '@/utils/utils';

export const uploadImage = async (file: File): Promise<string> => {
    // Create a unique filename using UUID
    const filename = `${v4()}-${file.name}`;
    // Access user info from local storage
    const currentUser = getUserCache();
    if(!currentUser) {
        throw new Error('FileUploadError: User is not logged in.');
    }
    const parsedUser = JSON.parse(currentUser as string);
    // Create a reference to the storage location where the file is uploaded
    const storageRef = ref(storage, `bulletin_posts/${parsedUser.uid}/${filename}`);
    
    // Upload the file to storage and return the download URL
    try {
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
    } catch (error: any) {
        console.error('FileUploadError: ', error.message);
        throw new Error('FileUploadError: Failed to upload file.');
    }
}