import Image from 'next/image';
import { FaClockRotateLeft } from "react-icons/fa6";
import { CategoryKey, BulletinPost } from '@/utils/types';
import { getCategoryColor } from '@/utils/utils';
import { getHoursAgo } from '@/utils/utils';
import { 
    Card, 
    CardHeader, 
    CardFooter, 
    CardContent 
} from '@/components/ui/card';

{/* Reset default padding, margin, border styled by ShadCN in the Card component before custom styling */}
export const Post = (post: BulletinPost) => {
    return (
        <Card 
            className="border-none p-0 w-full max-w-sm bg-[#202020] shadow-md flex flex-col gap-2 items-center rounded-lg"
        >
            <CardHeader className="relative w-full p-0 m-0">
                <Image 
                    src={post.imgURL ? post.imgURL : '/assets/Kanlaon.png'}
                    alt={post.title}
                        className="w-full h-60 object-cover p-0 rounded-t-sm"
                        width={300}
                        height={300}
                        priority
                />
                <p className={`absolute bottom-4 left-6 py-1 px-3 ${getCategoryColor(post.category as CategoryKey)} text-white text-xs font-normal rounded-full`}>{post.category.replace('_', ' ')}</p>
            </CardHeader>
            <CardContent className="w-full flex flex-col gap-4 flex-grow">
                <div className="flex flex-col items-left">
                    <h1 className="w-full text-lg font-semibold text-white text-wrap">{post.title}</h1>
                    <p className="text-sm font-gray text-lightgray">{post.postedBy} • {post.date.toDate().toLocaleDateString('en-US')}</p>
                </div>
                {post.description && (
                    <p className="text-md text-lightgray flex-grow">{post.description}</p>
                )}
            </CardContent>
            <CardFooter className="mt-auto w-full pb-6 pt-3">
                <div className="flex ml-auto items-center justify-center text-right gap-2">
                    <FaClockRotateLeft className="text-lightgray text-sm" />
                    <p className="text-sm text-lightgray">{getHoursAgo(post.date)} hours ago</p>
                </div>
            </CardFooter>
        </Card>        
    )
}