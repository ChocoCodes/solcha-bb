import { SidebarItemProps } from "@/utils/types";

export const SidebarItem = ({label, func, className}: SidebarItemProps) => {
    return (
        <button 
            className="p-4 rounded-md items-center hover:cursor-pointer" 
            onClick={func}
        >
            <div className={`flex items-center gap-2 align-center ${ className || '' }`}>
                <span className={`text-xl font-normal`}>{ label }</span>
            </div>
        </button>
    )
};