"use client";

import { useAuth } from '@/context/AuthContext';

export default function Bulletin() {
    const { handleSignOut } = useAuth();
    return (
        <>
            <h1>Test</h1>
            <button onClick={ handleSignOut } className="w-50 h-10">Sign Out</button>
        </>
    )
}
