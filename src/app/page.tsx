"use client";

import { Header } from '@/components/Header';
import { VolcanoMap, AddPostForm, Post } from '@/components/Bulletin/components';
import { useAuthCheck, useBulletinPosts } from '@/hooks/hooks';
import { Loading } from '@/components/Loading';
import { bulletinSampleData } from '@/utils/sampleData';
import { HiOutlinePlusSm } from "react-icons/hi";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';


export default function Bulletin() {
    // Check if user is logged in - redirect to sign in if not through useAuthCheck
    const { loading } = useAuthCheck();
    const { currentUser } = useAuth();
    const [filterBy, setFilterBy] = useState<'recent' | 'owned'>('recent');
    const [showForm, setShowForm] = useState<boolean>(false);
    // Fetch bulletin posts from Firestore
    const { posts, loading: isPostsLoading } = useBulletinPosts();
    const filteredPosts = posts.filter(post => filterBy === 'owned' ? post.postedBy === currentUser?.displayName : true);

    // Display loading screen while checking auth
    if(loading || isPostsLoading) {
        return <Loading />;
    }
    
    const onFormClose = () => setShowForm(false);
    const onFormOpen = () => setShowForm(true);

    return (
        <>
            <main className="flex w-screen h-screen">
                <div className="flex flex-1 flex-col gap-6 h-screen p-3">
                    <Header currentPage={"Bulletin"} />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-semibold pl-2">Volcano Map</h1>
                        <VolcanoMap posts={filteredPosts}/>
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
                            <button 
                                className="flex items-center justify-center bg-red-500 p-2 rounded-lg"
                                onClick={ onFormOpen }
                            >
                                <HiOutlinePlusSm className="text-white text-md cursor-pointer" />
                                <p className="text-md text-white">New</p>
                            </button>
                            { showForm && <AddPostForm onClose={ onFormClose } />}
                        </div>
                        <div className="flex flex-col gap-7">
                            {filteredPosts.map(post => {
                                return (
                                    <Post key={post.id} {...post} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
