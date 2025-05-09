import { SidebarItemProps } from "@/utils/types";

export const SidebarItem = ({label, func, className}: SidebarItemProps) => {
    return (
        <button 
            className="p-4 rounded-md items-center" 
            onClick={func}
        >
            <div className={`flex items-center gap-2 align-center ${ className || '' }`}>
                <span className={`px-4 text-xl font-normal`}>{ label }</span>
            </div>
        </button>
    )
};