"use client";

import { Header } from '@/components/Header';
import { VolcanoMap, AddPostForm, Post } from '@/components/Bulletin/components';
import { useAuthCheck, useBulletinPosts } from '@/hooks/hooks';
import { Loading } from '@/components/Loading';
import { HiOutlinePlusSm } from "react-icons/hi";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PostCategory, PostCategoryColors } from '@/utils/constants';

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
            <main className="flex flex-col w-screen h-screen lg:p-10">
                <div className="w-full flex flex-col gap-6 p-3">
                    <div className="relative w-full flex flex-col gap-3 mx-auto items-center pt-2 lg:pt-0">
                        <VolcanoMap posts={filteredPosts}/>
                        <div className="flex flex-col absolute left-4 top-3">
                            <h1 className="text-2xl lg:text-4xl text-charcoal p-2 font-semibold pl-1 w-80">Volcano Map</h1>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 w-full flex-wrap px-3 pl-1">
                        {Object.values(PostCategory).map(category => {
                            return (
                            <div key={category} className="flex gap-2 items-center">
                                <div className={`w-4 h-4 ${PostCategoryColors[category]} rounded-xs`}></div>
                                    <h1 className="text-xs lg:text-lg text-white font-normal">{category.replace("_", " ")}</h1>
                                </div>
                                )
                            })}
                    </div>
                    <div className="flex flex-col gap-7 p-5 w-full">
                        <h1 className="text-3xl lg:text-5xl font-regular text-center">Community Bulletin</h1>
                        <div className="flex justify-between items-center ">
                            <div className="flex gap-4 lg:gap-6 text-lg text-lightgray">
                                <button 
                                    className={`text-lg lg:text-xl p-2 border-b-2 hover:cursor-pointer border-b-lightgray ${filterBy === 'recent' ? 'border-b-lightgray' : 'border-b-transparent'}`}
                                    onClick={() => setFilterBy('recent')}
                                >
                                    Recent
                                </button>
                                <button 
                                    className={`text-lg lg:text-xl p-2 border-b-2 hover:cursor-pointer border-b-lightgray ${filterBy === 'owned' ? 'border-b-lightgray' : 'border-b-transparent'}`}
                                    onClick={() => setFilterBy('owned')}
                                >
                                    My Posts
                                </button>
                            </div>
                            <button 
                                className="text-md text-white lg:text-xl flex items-center justify-between bg-lava px-2 py-1 lg:px-4 lg:py-2 rounded-md lg:rounded-lg hover:bg-red-600 hover:cursor-pointer"
                                onClick={ onFormOpen }
                            >
                                <HiOutlinePlusSm/>
                                <p>New</p>
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
