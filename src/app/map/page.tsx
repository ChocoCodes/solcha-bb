"use client";

import { Header } from '@/components/Header';
import { PDZCircle } from '@/components/Bulletin/VolcanoMap';
import { KANLAON_COORDS } from '@/utils/constants';
import { simulationLocInPDZ } from '@/utils/sampleData';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import {
    APIProvider,
    Map as GoogleMap,
    AdvancedMarker,
    InfoWindow,
    Pin
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Loading } from '@/components/Loading';

export default function Map() {
    const { loading } = useAuthCheck();
    const [open, setOpen] = useState<boolean>(false);
    // Display loading screen while checking auth
    if(loading) {
        return <Loading />;
    }
    
    return (
        <>
            <Header currentPage={"Map"} />
            <main className="flex flex-col w-screen h-screen p-0">
                <div className="flex items-center shadow-md touch-none overflow-hidden w-full h-full focus:none">
                    <APIProvider apiKey={ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string }>
                        <GoogleMap 
                            defaultCenter={ KANLAON_COORDS } 
                            defaultZoom={ 12 }
                            style={{ width: '100%', height: '100%' }} 
                            mapId={ process.env.NEXT_PUBLIC_MAP_ID as string }
                            disableDefaultUI={true}
                            gestureHandling={"greedy"}
                        >
                            <AdvancedMarker position={KANLAON_COORDS} onClick={() => setOpen(true)}>
                                <span className="text-4xl">🌋</span>
                            </AdvancedMarker>
                            <PDZCircle />
                                {open && (
                                    <InfoWindow position={ KANLAON_COORDS } onCloseClick={() => setOpen(false)}>
                                        <div className="flex flex-col w-25 h-20 gap-2 p-3">
                                            <h1 className="text-sm font-semibold text-charcoal">Kanlaon Volcano</h1>
                                            <p className="text-xs text-charcoal">Active stratovolcano located in the Philippines.</p>
                                            <p className="text-xs text-charcoal">Coordinates: {KANLAON_COORDS.lat}, {KANLAON_COORDS.lng}</p>
                                        </div>
                                    </InfoWindow>
                                )}
                            <AdvancedMarker position={simulationLocInPDZ}>
                                <Pin background="blue" glyphColor="blue" borderColor="blue"/>
                            </AdvancedMarker>
                        </GoogleMap>
                    </APIProvider>
                </div>
            </main>
        </>
    )
};