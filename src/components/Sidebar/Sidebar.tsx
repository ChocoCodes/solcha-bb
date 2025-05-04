"use client";

import { SidebarItem } from './SidebarItem';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Routes, SidebarLabelText } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { MdSpaceDashboard } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { FaSignOutAlt, FaMapMarkedAlt } from "react-icons/fa";

const SidebarIcons = {
    [SidebarLabelText.BULLETIN]: <MdSpaceDashboard size={32} className="hover:cursor-pointer" />,
    [SidebarLabelText.MAP]: <FaMapMarkedAlt size={32} className="hover:cursor-pointer" />,
    [SidebarLabelText.CHATBOT]: <RiRobot2Fill size={32} className="hover:cursor-pointer" />,
}

export const Sidebar = () => {
    const { expanded, onExpand } = useSidebar();
    const { handleSignOut } = useAuth();
    const routes = useRouter();

    return (
        <aside className={`h-screen transition-all duration-200 bg-clear ${ expanded ? 'w-9/20' : 'w-3/20' }`}>
            <nav className="flex flex-col w-full h-full justify-start items-center">
                <div className={`w-4/5 flex items-center px-2 py-8 ${expanded ? 'border-b-2 border-gray-700 justify-between' : 'justify-center'}`}>
                    { expanded && <Image src="/assets/BB-logo.svg" alt="logo" width={48} height={48} priority/> }
                    <button onClick={ onExpand }>
                        { expanded ? <FiChevronsLeft size={32} /> : <FiChevronsRight size={32} />}
                    </button>
                </div>
                {/* Do not include the login/signin route when displaying it to our sidebar */}
                <div className="flex flex-col flex-grow gap-3 items-start justify-start px-4 py-10">
                    {Object.values(SidebarLabelText)
                        .filter(label => label !== SidebarLabelText.SIGNIN)
                        .map((label, index) => {
                            return (
                                <SidebarItem 
                                    key={ index }
                                    label={ label }
                                    func={ () => routes.push(Routes[label]) }   
                                    icon={ SidebarIcons[label] } 
                                 />
                            )
                    })}
                </div>
                <div className="flex flex-col flex-grow gap-3 items-start px-4">
                    {expanded && <hr className="w-full mx-auto border-gray-700" />}
                    <div className={`flex gap-2 py-3 items-center flex-col`}>
                        <SidebarItem
                            label={ "Sign Out" }
                            func={ handleSignOut }
                            icon={ <FaSignOutAlt size={32} className="fill-lava"/> }
                            className="text-sm font-normal font-"
                        />
                        {expanded && 
                            <Image 
                                src='/assets/BB-logo-text.svg'
                                alt='logo'
                                width={100}
                                height={100}
                                priority
                            />
                        }
                    </div>
                </div>
            </nav>
        </aside>
    )
}