import { BulletinPost } from './types';
import { PostCategory } from './constants';

export const bulletinSampleData: BulletinPost[] = [
    {
        title: "Volunteers Needed for Evacuation Center Setup",
        description: "Help needed to set up tents and distribute relief goods at the school.",
        date: "2025-05-04",
        category: PostCategory.HELP_WANTED,
        postedBy: "john_doe123",
        hoursAgo: 2,
        position: {
            lat: 10.422635, 
            lng: 123.076032
        }
    },
    {
        title: "How to Prepare for Ashfall",
        description: "Wear masks, stay indoors, and protect water sources from contamination.",
        date: "2023-05-05",
        category: PostCategory.INFORMATION,
        postedBy: "lgu_city123",
        hoursAgo: 2,
        position: {
            lat: 10.386304052026134, 
            lng: 123.21657344906396
        },
    },
    {
        title: "Kanlaon Raised to Level 3",
        description: "Evacuation of residents within 6km radius is advised.",
        date: "2023-05-05",
        category: PostCategory.INFORMATION,
        postedBy: "miyal74409",
        hoursAgo: 3,
        position: {
            lat: 10.386304052026134, 
            lng: 123.21657344906396
        },
    }
] 