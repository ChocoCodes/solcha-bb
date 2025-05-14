"use client";

import { Header } from "@/components/Header";
import { Message } from '@/utils/types';
import { useEffect, useRef, useState } from "react";
import { ChatInput, ChatWelcome, ChatBox } from '@/components/Chatbot/components'
import { dummyMessages } from "@/utils/sampleData";

export default function Chatbot () {
    const [messages, setMessages] = useState<Message[]>(dummyMessages);
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
                <div className="flex flex-col lg:w-7/10 lg:mx-auto flex-grow overflow-y-auto px-6 gap-3 pt-10 chat-scroll">
                    {messages.length === 0 ? (
                        <ChatWelcome />
                    ) :
                        messages.map((message, index) => {
                            return (
                                <ChatBox key={index} {...message} />
                            )
                        }
                    )}
                    <div ref={bottomRef} className="h-0"></div>
                </div>
                <ChatInput onSend={addMessage} />
            </main>
        </>
    )
};