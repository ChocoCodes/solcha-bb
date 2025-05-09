"use client";

import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from 'next/navigation';
import { SidebarLabelText, Routes } from '@/utils/constants';
import { FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import { SidebarItem } from './Sidebar/SidebarItem';
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
    const { push } = useRouter();
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    console.log(isSheetOpen);

    return (
        <header className="text-center py-4 px-4 border-b-2 border-gray-500">
           <div className="flex justify-between items-center">
            {/* Sheet container for sidebar */}
            <div className="block md:hidden">
                    <Sheet open={ isSheetOpen } onOpenChange={ setIsSheetOpen }>
                        <SheetTrigger className="text-2xl cursor-pointer" asChild>
                            <button className="p-1">
                                <RxHamburgerMenu className="text-2xl text-white" />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="flex flex-col items-left justify-center bg-charcoal p-4"
                        >
                            <SheetHeader className="flex items-left flex-start p-5 border-b-2 w-full">
                                <Image src="/assets/BB-logo-text.svg" alt="logo" width={125} height={125} loading='lazy'/> 
                            </SheetHeader>
                            <div className="flex flex-col flex-grow gap-4">
                                {Object.values(SidebarLabelText)
                                    .filter(label => label !== SidebarLabelText.SIGNIN)
                                    .map((label, index) => {
                                        return (
                                            <SidebarItem 
                                                key={ index }
                                                label={ label }
                                                func={ () => push(Routes[label]) }   
                                            />
                                        )
                                })}
                            </div>
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
                <h1 className="text-2xl font-bold text-left">{ currentPage }</h1>
                <div className="w-6 none"></div>
            {/* container for nav-items - pc mode */}
           </div>
        </header>
    )
}