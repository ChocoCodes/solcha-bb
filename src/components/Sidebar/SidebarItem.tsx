import { SidebarItemProps } from "@/utils/types";
import { useSidebar } from '@/context/SidebarContext';

export const SidebarItem = ({label, func, icon, className}: SidebarItemProps) => {
    const { expanded } = useSidebar();
    return (
        <button 
            className="p-2 rounded-md items-left" 
            onClick={func}
        >
            <div className="flex items-center gap-2 align-center">
                { icon }
                {expanded && (
                    <span className={`text-lg font-semibold ${ className || '' }`}>{ label }</span>
                )}
            </div>
        </button>
    )
};