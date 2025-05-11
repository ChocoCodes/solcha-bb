import { SidebarLabelText } from "@/utils/constants"
import { SidebarItem } from "./SidebarItem"
import { Routes } from '@/utils/constants'
import { useRouter } from 'next/navigation'

export const SidebarLinks = () => {
    const { push } = useRouter();
    return (
        <div className="flex flex-col flex-grow gap-4 lg:flex-row lg:items-center">
            {Object.values(SidebarLabelText)
                .filter(label => label !== SidebarLabelText.SIGNIN)
                .map((label, index) => {
                    return (
                        <SidebarItem 
                            key={ index }
                            label={ label }
                            func={ () => push(Routes[label]) }  
                            className="hover:underline"
                        />
                    )
                })}
        </div>
    )
}