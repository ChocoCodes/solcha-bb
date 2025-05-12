"use client";

import { Header } from '@/components/Header';
import { PDZCircle } from '@/components/Bulletin/VolcanoMap';
import { KANLAON_COORDS } from '@/utils/constants';
import { simulationLocInPDZ } from '@/utils/sampleData';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import { Loading } from '@/components/Loading';
import { MapMarker } from '@/components/Map/MapMarker';
import {
    APIProvider,
    Map as GoogleMap,
    Pin,
    ColorScheme
} from '@vis.gl/react-google-maps';


export default function Map() {
    const { loading } = useAuthCheck();
    // Display loading screen while checking auth
    if(loading) {
        return <Loading />;
    }
    
    return (
        <>
            <Header currentPage="Map" />
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
                            colorScheme={ColorScheme.DARK}
                        >
                            <PDZCircle />
                            {/* Kanlaon Volcano Marker */}
                            <MapMarker
                                position={ KANLAON_COORDS }
                                icon="🌋"
                                place="Kanlaon Volcano"
                                description="Active stratovolcano located in the Philippines."
                            />
                            {/* Simulation Marker inside the 6km PDZ*/}
                            <MapMarker 
                                position={ simulationLocInPDZ }
                                icon="🏠"
                                place="Cabagnaan Barangay Hall"
                                description="Sample Location"
                                pin={ <Pin background="blue" glyphColor="blue" borderColor="blue"/> }
                            />
                        </GoogleMap>
                    </APIProvider>
                </div>
            </main>
        </>
    )
};