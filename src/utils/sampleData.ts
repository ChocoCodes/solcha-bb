import { BulletinPost } from './types';
import { PostCategory } from './constants';
import { GeoPoint, Timestamp } from 'firebase/firestore';

export const bulletinSampleData: BulletinPost[] = [
    {
        title: "Volunteers Needed for Evacuation Center Setup",
        description: "Help needed to set up tents and distribute relief goods at the school.",
        date: Timestamp.fromDate(new Date("2025-05-04")),
        category: PostCategory.HELP_WANTED,
        postedBy: "john_doe123",
        position: new GeoPoint(10.422635, 123.076032),
    },
    {
        title: "How to Prepare for Ashfall",
        description: "Wear masks, stay indoors, and protect water sources from contamination.",
        date: Timestamp.fromDate(new Date("2023-05-05")),
        category: PostCategory.INFORMATION,
        postedBy: "lgu_city123",
        position: new GeoPoint(10.386304052026134, 123.21657344906396)
    },
    {
        title: "Kanlaon Raised to Level 3",
        description: "Evacuation of residents within 6km radius is advised.",
        date: Timestamp.fromDate(new Date("2023-05-05")),
        category: PostCategory.INFORMATION,
        postedBy: "miyal74409",
        position: new GeoPoint(10.386304052026134, 123.21657344906396),
    }
]

// Sample data when user is inside the 6KM PDZ
// (CABAGNAAN Barangay Hall)
export const simulationLocInPDZ = {
    lat: 10.363286818635078, 
    lng: 123.11906410683196
}