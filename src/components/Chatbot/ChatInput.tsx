"use client";
import { useState } from 'react';
import { FaArrowUp } from "react-icons/fa6";
import { Message } from '@/utils/types';

interface ChatInputProps {
    onSend: (message: Message) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if(!input.trim()) return;
        onSend({
            sender: 'user',
            content: input
        });
        setInput('');
    }

    return (
        <div className="mx-auto lg:w-7/10 lg:pb-10 w-9/10 pt-1 pb-2 flex flex-col gap-4 bg-transparent">
            <h1 className="p-2 bg-transparent text-white w-4/5 mx-auto text-xs md:text-lg text-center lg:w-full">
                BB Bot CANNOT predict nor forecast data. Live data is provided by <span className="underline text-white">DOST-PHIVOLCS</span>.
            </h1>
            <div className=" flex justify-between items-center px-6 py-4 bg-[#1A1919] border-t-[1px] border-white/70 rounded-t-[30px] glow">
                <input 
                    type="text"
                    autoComplete='off'
                    placeholder="Ask me anything..."
                    className="w-full focus:outline-none text-lg"
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                />
                <button 
                    className={`cursor-pointer w-8 h-8 flex items-center justify-center p-2 rounded-full bg-white text-charcoal ${!input.trim() ? 'opacity-70' : 'hover:opacity-90'}`} 
                    disabled={!input.trim()}
                    onClick={handleSend}
                >
                    <FaArrowUp className="text-lg"/>
                </button>
            </div>
        </div>
    )
}