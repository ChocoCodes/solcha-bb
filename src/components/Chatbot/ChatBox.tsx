import { Message } from '@/utils/types';

const ChatBox = ({sender, content, isTyping}: Message) => {
    return (
        <div 
            className={`flex flex-col text-md items-center justify-center text-wrap ${sender == "user" ? 'max-w-4/5 py-2 rounded-xl self-end bg-chat-bubble px-5 ' : 'max-w-3/4 px-4 self-start '} text-neutral max-w-[80%]`}
        >
            { isTyping ? <TypingIndicator /> : content }
        </div>
    )
}

const TypingIndicator = () => {
    return (
        <div className="rounded-xl px-4 self-start dot animate-pulse w-2/5 bg-red-300 text-white">
            <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
        </div>
    )
}
export { ChatBox, TypingIndicator };