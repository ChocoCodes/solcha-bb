"use client";

import { Header } from "@/components/Header";
import { Message } from '@/utils/types';
import { useEffect, useRef, useState } from "react";
import { ChatInput, ChatWelcome, ChatBox } from '@/components/Chatbot/components';

export default function Chatbot () {
    const [messages, setMessages] = useState<Message[]>([]);
    const [botTyping, setBotTyping] = useState<boolean>(false);
    // Scroll to the bottom reference after chat is loaded
    const bottomRef = useRef<HTMLDivElement>(null);
    
    const addMessage = async ({ sender, content }: Message) => {
        setBotTyping(true);
        setMessages(prev => [...prev, { sender, content }, { sender: "bot", content: "", isTyping: botTyping }]);

        // Connect to the API Endpoint
        try {
            const res = await fetch('/api/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: content
                }),
            })
            // Get the response from the API
            const data = await res.json();
            setMessages(prev => [
                ...prev.slice(0, -1),
                { sender: "bot", content: data.response, isTyping: false }
            ]);
        } catch (error: unknown) {
            const err = error as Error;
            console.error("APIConnectionError: ", err.message);
            setMessages(prev => [
                ...prev.slice(0, -1),
                { sender: "bot", content: "Sorry, I couldn't connect to the API.", isTyping: false }
            ]);
        } finally {
            setBotTyping(false);
        }
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