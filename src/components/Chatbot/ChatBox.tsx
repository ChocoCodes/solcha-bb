import { Message } from '@/utils/types';

export const ChatBox = ({sender, content}: Message) => {
    return (
        <div className={`flex flex-col text-md items-center justify-center text-black text-wrap ${sender == "user" ? 'max-w-4/5 py-2 rounded-xl self-end bg-white/20 px-5' : 'px-4 self-start'} text-white max-w-[80%]`}>
            { content }
        </div>
    )
}