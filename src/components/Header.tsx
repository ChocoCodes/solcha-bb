"use client";

import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import Image from 'next/image';
import { SidebarLinks } from './Sidebar/SidebarLinks';
import { SidebarItem } from './Sidebar/SidebarItem'
import { useAuth } from  '@/context/AuthContext';
import { 
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetFooter,
} from '@/components/ui/sheet';

type HeaderProps = {
    currentPage: string;
};

export const Header = ({ currentPage }: HeaderProps) => {
    const { handleSignOut } = useAuth();
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);


    return (
        <header className={`${currentPage === "Map" ? 'sticky': ''} text-center p-4 lg:px-20 lg:py-1 border-b-2 border-gray-500`}>
           <div className="flex justify-between items-center">
            {/* Sheet container for sidebar */}
            <div className="block md:hidden ">
                    <Sheet open={ isSheetOpen } onOpenChange={ setIsSheetOpen }>
                        <SheetTrigger className="text-2xl cursor-pointer" asChild>
                            <button className="p-2">
                                <RxHamburgerMenu className="text-2xl text-white" />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="flex flex-col items-left justify-center backdrop-blur-xs bg-charcoal/80 p-4"
                        >
                            <SheetHeader className="flex items-left flex-start p-5 border-b-2 w-full">
                                <Image src="/assets/BB-logo-text.svg" alt="logo" width={125} height={125} loading='lazy'/> 
                            </SheetHeader>
                            <SidebarLinks />
                            <SheetFooter className="flex flex-col gap-2 py-4 items-center border-t-2 border-gray-500">
                                <SidebarItem
                                    label={ "Sign Out" }
                                    func={ handleSignOut }
                                    className="text-3xl font-semibold px-5 py-3 rounded-md bg-lava"
                                />    
                                <Image 
                                    src='/assets/BB-logo.svg'
                                    alt='logo'
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                />                            
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
            </div>
                <h1 className="text-2xl font-bold text-left p-1">{ currentPage }</h1>
                {/* container for nav-items - pc mode */}
                <nav className="hidden md:flex gap-3 md:items-center text-center">
                    <SidebarLinks />
                </nav>
                <SidebarItem
                    label={ "Sign Out" }
                    func={ handleSignOut }
                    className="hidden md:flex text-3xl font-semibold px-0 py-2 rounded-md bg-lava hover:cursor-pointer hover:bg-red-600 transition no-underline"
                />  
           </div>
        </header>
    )
}