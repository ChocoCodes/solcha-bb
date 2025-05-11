"use client";

import { useState, useEffect } from 'react';
import { KANLAON_COORDS, PDZ_RADIUS } from '@/utils/constants';
import { VolcanoMarkerProps, CategoryKey } from '@/utils/types';
import { getCategoryColor, extractHexColor } from '@/utils/utils';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps';


// Circle component overlay on top of the map
export const PDZCircle = () => {
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
            radius: PDZ_RADIUS * 1000, // 6km radius to meters
        })
    
        return () => circle.setMap(null); // Clean up on unmount
    }, [map]);
    return null;
}

    export const VolcanoMap = ({ posts }: VolcanoMarkerProps) => {
        const [open, setOpen] = useState<boolean>(false);

        return (
            <APIProvider apiKey={ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string }>
                <div className="flex items-center w-90 h-80 shadow-md touch-none overflow-hidden lg:w-full lg:h-150 rounded-2xl">
                    {/*use defaultCenter and defaultZoom as props instead of center and zoom - perform events through the map*/}
                    <Map 
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
                        {/* Render marker of post location dynamically */}
                        {posts.map((post, index) => {
                            if(!post.position) return null; // Skip if position is not available
                            const color = getCategoryColor(post.category as CategoryKey);
                            const pinColor = extractHexColor(color);
                            return (
                                <AdvancedMarker 
                                    key={index}
                                    position={{
                                        lat: post.position.latitude,
                                        lng: post.position.longitude
                                    }}
                                >
                                    <Pin background={pinColor} glyphColor={pinColor} borderColor={pinColor}/>
                                </AdvancedMarker>
                            )
                        })}
                    </Map>
                </div>
            </APIProvider>
        )
    }