"use client";

import { Header } from '@/components/Header';
import { PDZCircle } from '@/components/Bulletin/VolcanoMap';
import { KANLAON_COORDS } from '@/utils/constants';
import { simulationLocInPDZ } from '@/utils/sampleData';
import { useAuthCheck, useNearbySearch } from '@/hooks/hooks';
import { Loading } from '@/components/Loading';
import { MapMarker } from '@/components/Map/MapMarker';
import { useMemo } from 'react';
import { haversine } from '@/utils/haversine';
import {
    APIProvider,
    Map as GoogleMap,
    Pin,
    ColorScheme
} from '@vis.gl/react-google-maps';


export default function Map() {
    const { loading } = useAuthCheck();
    // Memoize the user location and search criteria to avoid unnecessary re-renders
    const userLoc = useMemo(() => simulationLocInPDZ, []);
    const searchProps = useMemo(() => ({
        center: userLoc,
        radiusM: 50000, // 50km radius
        types: ['school'],
        maxResults: 20
    }), [userLoc]);

    const { places, loading: isLoadingPlaces } = useNearbySearch(searchProps);
    // Filter out places that are outside the 6km PDZ
    const evacuationCenters = places.filter(place => haversine(userLoc, place.location) >= 6.0);
    console.log('Filtered Places: ', evacuationCenters);
    // Display loading screen while checking auth isLoadingPlaces
    if(loading || isLoadingPlaces) {
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
                                place="Me"
                                description="Cabagnaan Barangay Hall"
                                pin={ <Pin background="blue" glyphColor="blue" borderColor="blue"/> }
                            />
                            {evacuationCenters.map((place, index) => {
                                return (
                                    <MapMarker 
                                        key={index}
                                        position={place.location}
                                        icon="🏫"
                                        place={place.displayName}
                                        description={"This school may serve as a safe shelter during a volcanic eruption."}
                                        pin={ <Pin background="green" glyphColor="green" borderColor="green"/> }
                                    />
                                )
                            })}
                        </GoogleMap>
                    </APIProvider>
                </div>
            </main>
        </>
    )
};