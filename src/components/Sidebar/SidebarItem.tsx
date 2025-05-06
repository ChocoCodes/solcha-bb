import { SidebarItemProps } from "@/utils/types";

export const SidebarItem = ({label, func, icon, className}: SidebarItemProps) => {
    return (
        <button 
            className="p-4 rounded-md items-center" 
            onClick={func}
        >
            <div className={`flex items-center gap-2 align-center ${ className || '' }`}>
                { icon }
                <span className={`text-3xl font-semibold `}>{ label }</span>
            </div>
        </button>
    )
};