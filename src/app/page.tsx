"use client";

import { Header } from '@/components/Header';
import { VolcanoMap } from '@/components/Bulletin/VolcanoMap';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import { Loading } from '@/components/Loading';
import { bulletinSampleData } from '@/utils/sampleData';
import Image from 'next/image';
import { FaClockRotateLeft } from "react-icons/fa6";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
    Card, 
    CardHeader, 
    CardFooter, 
    CardContent 
} from '@/components/ui/card';

export default function Bulletin() {
    // Check if user is logged in - redirect to sign in if not through useAuthCheck
    const { loading } = useAuthCheck();
    const { currentUser } = useAuth();
    const [filterBy, setFilterBy] = useState<'recent' | 'owned'>('recent');

    const filteredPosts = bulletinSampleData.filter(post => filterBy === 'owned' ? post.postedBy === currentUser?.displayName : true);
    
    // Display loading screen while checking auth
    if(loading) {
        return <Loading />;
    }
    
    return (
        <>
            <main className="flex w-screen h-screen">
                <div className="flex flex-1 flex-col gap-6 h-screen p-3">
                    <Header currentPage={"Bulletin"} />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-semibold pl-2">Volcano Map</h1>
                        <VolcanoMap postPositions={filteredPosts.map(post => post.position)}/>
                    </div>
                    <div className="flex flex-col gap-7 p-5">
                        <h1 className="text-3xl font-regular text-center">Community Bulletin</h1>
                        <div className="flex justify-between items-center ">
                            <div className="flex gap-4 text-lg text-lightgray">
                                <button 
                                    className={`p-2 border-b-2 border-b-lightgray ${filterBy === 'recent' ? 'border-b-lightgray' : 'border-b-transparent'}`}
                                    onClick={() => setFilterBy('recent')}
                                >
                                    Recent
                                </button>
                                <button 
                                    className={`p-2 border-b-2 border-b-lightgray ${filterBy === 'owned' ? 'border-b-lightgray' : 'border-b-transparent'}`}
                                    onClick={() => setFilterBy('owned')}
                                >
                                    My Posts
                                </button>
                            </div>
                            <button className="flex items-center justify-center bg-red-500 p-2 rounded-lg">
                                <HiOutlinePlusSm className="text-white text-md cursor-pointer" />
                                <p className="text-md text-white">New</p>
                            </button>
                        </div>
                        <div className="flex flex-col gap-7">
                            {filteredPosts.map((post, index) => {
                                {/* Reset default padding, margin, border styled by ShadCN in the Card component before custom styling*/}
                                return (
                                    <Card 
                                        key={index} 
                                        className="border-none w-full max-w-md p-0 bg-[#202020] shadow-md flex flex-col gap-2 items-center rounded-lg"
                                    >
                                        <CardHeader className="relative w-full p-0 m-0">
                                            <Image 
                                                src="/assets/Kanlaon.png"
                                                alt={post.title}
                                                className="w-full p-0 rounded-t-sm"
                                                width={300}
                                                height={300}
                                                priority
                                            />
                                            <p className="absolute bottom-4 left-2 bg-red-500 py-1 px-2 text-white text-xs rounded-full">{ post.category }</p>
                                        </CardHeader>
                                        <CardContent className="w-full flex flex-col gap-4">
                                            <div className="flex flex-col items-left">
                                                <h1 className="w-60 text-lg font-semibold text-white text-wrap">{post.title}</h1>
                                                <p className="text-sm font-gray text-lightgray">{post.postedBy} • {post.date}</p>
                                            </div>
                                            {post.description && (
                                                <p className="text-md text-lightgray">{post.description}</p>
                                            )}
                                        </CardContent>
                                        <CardFooter className="w-full pb-5 pt-3">
                                            <div className="flex ml-auto items-center justify-center text-right gap-2">
                                                <FaClockRotateLeft className="text-lightgray text-sm" />
                                                <p className="text-sm text-lightgray">{post.hoursAgo} hours ago</p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
