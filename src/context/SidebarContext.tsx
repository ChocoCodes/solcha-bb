"use client";

import { useState, createContext, useContext } from 'react';
import { ChildProps } from '@/utils/types';

export type SidebarContextType = {
    expanded: boolean;
    onExpand: () => void;
};

const defaultSidebarContextValue: SidebarContextType = {
    expanded: false,
    onExpand: () => {},
};

const SidebarContext = createContext<SidebarContextType>(defaultSidebarContextValue); 

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({children}: ChildProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    
    const onExpand = () => {
        console.log('onExpand toggle');
        setExpanded(!expanded);
    }

    return (
        <SidebarContext.Provider value={{ expanded, onExpand }}>
            { children }
        </SidebarContext.Provider>
    )
}