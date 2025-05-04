"use client";

import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Header } from '@/components/Header';

export default function Bulletin() {
    return (
        <>
            <main className="flex w-screen h-screen">
                <Sidebar />
                <div className="flex-1 flex-col h-screen">
                    <Header currentPage={"Bulletin"} />
                </div>
            </main>
        </>
    )
}
