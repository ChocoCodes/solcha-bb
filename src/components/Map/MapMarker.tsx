import { useState } from 'react';
import { AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { MapMarkerProps } from '@/utils/types';

export const MapMarker = ({position, icon, place, description, pin}: MapMarkerProps) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                {icon && 
                    <span className="text-4xl">{ icon }</span>
                }
                {pin && pin}
            </AdvancedMarker>
            {open && (
                <InfoWindow position={ position } onCloseClick={() => setOpen(false)}>
                    <div className="flex flex-col">
                        <h1 className="text-sm font-semibold text-charcoal">{ place }</h1>
                        {description && 
                            <p className="text-xs text-charcoal">{description}</p>
                        }
                        <p className="text-xs text-charcoal">Coordinates: {position.lat}, {position.lng}</p>
                    </div>
                </InfoWindow>
            )}
        </>
    )
}