import { SidebarItemProps } from "@/utils/types";

export const SidebarItem = ({label, func}: SidebarItemProps) => {
    return (
        <button 
            className="p-2 rounded-md" 
            onClick={func}
        >
            { label }
        </button>
    )
};