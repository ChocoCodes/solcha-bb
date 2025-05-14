import { NearbySearchProps, PlaceResult } from '@/utils/types';
import { useState, useEffect, useCallback } from 'react';

export const useNearbySearch = ({
    center,
    radiusM,
    types,
    maxResults,
}: NearbySearchProps) => {
    const [places, setPlaces] = useState<PlaceResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Memoize the fetchNearbyPlaces function
    const fetchNearbyPlaces = useCallback(async () => {
        try {
            setLoading(true);
            if (!window.google) {
                setPlaces([]);
                setLoading(false);
                setError('Google Maps API not loaded.');
                return;
            }

            const { Place, SearchNearbyRankPreference } = await (window.google.maps.importLibrary(
                'places'
            ) as Promise<google.maps.PlacesLibrary>);

            const request = {
                fields: ['displayName', 'location', 'primaryType'],
                locationRestriction: {
                    center: new google.maps.LatLng(center),
                    radius: radiusM,
                },
                includedPrimaryTypes: types,
                maxResultCount: maxResults,
                rankPreference: SearchNearbyRankPreference.DISTANCE,
                language: 'en-US',
                region: 'PH',
            };
            const { places } = await Place.searchNearby(request);
            const parsedPlaces: PlaceResult[] = places.map(
                (place: google.maps.places.Place) => {
                    return {
                        displayName: place.displayName || 'Unknown Place',
                        location: {
                            lat: place.location?.lat() || 0,
                            lng: place.location?.lng() || 0,
                        },
                        primaryType: place.primaryType || 'Unknown Type',
                    };
                }
            );
            setPlaces(parsedPlaces);
            setLoading(false);
        } catch (_error) {
            const err = _error as Error;
            setError(err.message);
            console.error('NearbySearchError:', err.message);
        }
    }, [center, radiusM, types, maxResults]);

    useEffect(() => {
        fetchNearbyPlaces();
    }, [fetchNearbyPlaces]); // Only re-run when fetchNearbyPlaces changes

    return { places, loading, error };
};