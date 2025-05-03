"use client";

import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { SidebarItem } from './SidebarItem';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Routes, SidebarLabelText } from '@/utils/constants';
import { useRouter } from 'next/navigation';

export const Sidebar = () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const { handleSignOut } = useAuth();
    const routes = useRouter();
    const handleExpand = () => setExpanded(!expanded);

    return (
        <aside className={`h-screen transition-all duration-200 ${ expanded ? 'w-9/20' : 'w-0'}`}>
            <nav className="flex flex-col w-full h-full justify-between">
                <div className={`flex justify-between items-center px-6 py-10 ${expanded ? 'border-b-2 border-gray-700' : ''}`}>
                    { expanded && <Image src="/assets/BB-logo.svg" alt="logo" width={48} height={48} priority/> }
                    <button onClick={ handleExpand } className="">
                        { expanded ? <FiChevronsLeft size={32} /> : <FiChevronsRight size={32} />}
                    </button>
                </div>
                {/* Do not include the login/signin route when displaying it to our sidebar */}
                {expanded && 
                    <>
                        <div className="flex flex-col gap-3 items-start justify-start px-6">
                            {Object.values(SidebarLabelText)
                                .filter(label => label !== SidebarLabelText.SIGNIN)
                                .map((label, index) => {
                                    return (
                                        <SidebarItem 
                                            key={index}
                                            label={label}
                                            func={() => routes.push(Routes[label])}    
                                        />
                                    )
                            })}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <hr className="w-full mx-auto border-gray-700" />
                            <div className="flex flex-col gap-2 items-center justify-content px-6 py-3">
                                <SidebarItem
                                    label="Sign Out"
                                    func={ handleSignOut }
                                />
                                <Image 
                                    src='/assets/BB-logo-text.svg'
                                    alt='logo'
                                    width={64}
                                    height={64}
                                    priority
                                />
                            </div>
                        </div>
                    </>
                }
            </nav>
        </aside>
    )
}