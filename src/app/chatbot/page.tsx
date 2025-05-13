"use client";

import { ChatInput } from "@/components/Chatbot/ChatInput";
import { Header } from "@/components/Header";
import { Message } from '@/utils/types';
import { useEffect, useRef, useState } from "react";
import { dummyMessages } from "@/utils/sampleData";

export default function Chatbot () {
    const [messages, setMessages] = useState<Message[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    
    const addMessage = ({ sender="user", content }: Message) => {
        setMessages(prev => [...prev, { sender, content }]);
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <Header currentPage="Chat" />
            <main className="flex flex-col w-screen h-screen p-0">
                <div className="flex flex-col flex-grow overflow-y-auto px-6 gap-5 py-10">
                    {messages.length === 0 ? (
                        <div className="flex flex-1 w-full h-full items-center justify-center">
                            <p className="text-center text-white text-2xl font-bold">Hi! How can I help you?</p>
                        </div>
                    ) :
                        messages.map((message, index) => {
                            return (
                                <div className={`flex flex-col text-md items-center justify-center text-black text-wrap ${message.sender == "user" ? 'max-w-4/5 px-4 py-2 rounded-md self-end bg-red-300' : 'text-white self-start'}`} key={index}>
                                    {message.content}
                                </div>
                            )
                        }
                    )}
                </div>
                <ChatInput onSend={addMessage} />
            </main>
        </>
    )
};