
type coords = {
    lat: number;
    lng: number;
}

const toRad = (x: number) => x * (Math.PI / 180);

export const haversine = (A: coords, B: coords) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(B.lat - A.lat);
    const dLon = toRad(B.lng - A.lng);

    const lat1 = toRad(A.lat);
    const lat2 = toRad(B.lat);

    const a = Math.pow(Math.sin(dLat / 2), 2) +
              Math.pow(Math.sin(dLon / 2), 2) * 
              Math.cos(lat1) * Math.cos(lat2)

    const c = 2 * Math.asin(Math.sqrt(a));
    return R * c; // distance in kilometers
}