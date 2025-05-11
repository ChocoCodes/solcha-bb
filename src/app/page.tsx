"use client";

import { Header } from '@/components/Header';
import { VolcanoMap, AddPostForm, Post } from '@/components/Bulletin/components';
import { useAuthCheck, useBulletinPosts } from '@/hooks/hooks';
import { Loading } from '@/components/Loading';
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
            <Header currentPage={"Bulletin"} />
            <main className="flex w-screen h-screen lg:p-10">
                <div className="w-full flex flex-col gap-6 h-screen p-3">
                    <div className="relative flex flex-col gap-3 w-full mx-auto items-center">
                        <VolcanoMap posts={filteredPosts}/>
                        <h1 className="absolute left-4 top-3 text-2xl lg:text-4xl text-charcoal p-2 w-90 font-semibold pl-2">Volcano Map</h1>
                    </div>
                    <div className="flex flex-col gap-7 p-5 w-full">
                        <h1 className="text-3xl lg:text-5xl font-regular text-center">Community Bulletin</h1>
                        <div className="flex justify-between items-center ">
                            <div className="flex gap-4 lg:gap-6 text-lg text-lightgray">
                                <button 
                                    className={`text-2xl lg:text-3xl p-2 border-b-2 hover:cursor-pointer border-b-lightgray ${filterBy === 'recent' ? 'border-b-lightgray' : 'border-b-transparent'}`}
                                    onClick={() => setFilterBy('recent')}
                                >
                                    Recent
                                </button>
                                <button 
                                    className={`text-2xl lg:text-3xl p-2 border-b-2 hover:cursor-pointer border-b-lightgray ${filterBy === 'owned' ? 'border-b-lightgray' : 'border-b-transparent'}`}
                                    onClick={() => setFilterBy('owned')}
                                >
                                    My Posts
                                </button>
                            </div>
                            <button 
                                className="text-2xl lg:text-3xl flex items-center justify-center bg-lava px-4 py-2 rounded-lg hover:bg-red-600 hover:cursor-pointer"
                                onClick={ onFormOpen }
                            >
                                <HiOutlinePlusSm className="text-white text-md cursor-pointer" />
                                <p className="text-md text-white">New</p>
                            </button>
                            { showForm && <AddPostForm onClose={ onFormClose } />}
                        </div>
                        <div className="flex flex-col gap-7 flex-wrap lg:flex-row">
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
