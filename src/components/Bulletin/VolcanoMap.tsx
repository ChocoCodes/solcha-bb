"use client";

import { useEffect } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap
} from '@vis.gl/react-google-maps';
import { KANLAON_COORDS, PDZ_RADIUS } from '@/utils/constants';


// Circle component overlay on top of the map
const PDZCircle = () => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        const circle = new google.maps.Circle({
            strokeColor: `#FF0000`,
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: `#FF4E08`,
            fillOpacity: 0.35,
            map: map,
            center: KANLAON_COORDS,
            radius: PDZ_RADIUS * 1000,
        })
    
        return () => circle.setMap(null); // Clean up on unmount
    }, [map]);
    return null;
}

export const VolcanoMap = () => {
    return (
        <APIProvider apiKey={ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string }>
            <div className="w-73 h-73 rounded-lg shadow-md mx-auto touch-none overflow-hidden">
            {/*use defaultCenter and defaultZoom as props instead of center and zoom - perform events through the map*/}
            <Map 
                defaultCenter={ KANLAON_COORDS } 
                defaultZoom={ 11 }
                style={{ width: '100%', height: '100%' }} 
                mapId={ process.env.NEXT_PUBLIC_MAP_ID as string }
                disableDefaultUI={true}
                gestureHandling={"greedy"}
            />
            <AdvancedMarker position={KANLAON_COORDS}></AdvancedMarker>
            <PDZCircle />
            </div>
        </APIProvider>
    )
}