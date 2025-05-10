"use client";

import { useEffect } from 'react';
import { KANLAON_COORDS, PDZ_RADIUS } from '@/utils/constants';
import { VolcanoMarkerProps, CategoryKey } from '@/utils/types';
import { getCategoryColor } from '@/utils/utils';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap,
    Pin
} from '@vis.gl/react-google-maps';


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
            radius: PDZ_RADIUS * 1000, // 6km radius to meters
        })
    
        return () => circle.setMap(null); // Clean up on unmount
    }, [map]);
    return null;
}

    export const VolcanoMap = ({ posts }: VolcanoMarkerProps) => {

        return (
            <APIProvider apiKey={ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string }>
                <div className="w-90 h-80 shadow-md mx-auto touch-none overflow-hidden">
                    {/*use defaultCenter and defaultZoom as props instead of center and zoom - perform events through the map*/}
                    <Map 
                        defaultCenter={ KANLAON_COORDS } 
                        defaultZoom={ 11 }
                        style={{ width: '100%', height: '100%' }} 
                        mapId={ process.env.NEXT_PUBLIC_MAP_ID as string }
                        disableDefaultUI={true}
                        gestureHandling={"greedy"}
                    >
                        <AdvancedMarker position={KANLAON_COORDS}>
                            <Pin background="red" />
                        </AdvancedMarker>
                        <PDZCircle />
                        {/* Render marker of post location dynamically */}
                        {posts.map((post, index) => {
                            const color = getCategoryColor(post.category as CategoryKey);
                            return (
                                <AdvancedMarker 
                                    key={index}
                                    position={
                                        post.position ? {
                                            lat: post.position.latitude,
                                            lng: post.position.longitude
                                        } : null
                                    }
                                >
                                    <Pin background={color}/>
                                </AdvancedMarker>
                            )
                        })}
                    </Map>
                </div>
            </APIProvider>
        )
    }