"use client";

import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Header } from '@/components/Header';
import { VolcanoMap } from '@/components/Bulletin/VolcanoMap';

export default function Bulletin() {
    return (
        <>
            <main className="flex w-screen h-screen">
                <Sidebar />
                <div className="flex flex-1 flex-col gap-6 h-screen p-3">
                    <Header currentPage={"Bulletin"} />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-semibold pl-2">Volcano Map</h1>
                        <VolcanoMap />
                    </div>
                </div>
            </main>
        </>
    )
}
