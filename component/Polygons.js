import * as geolib from "geolib";

export const polygonCoordinates = [{longitude: 19.840782, latitude: 45.239443}, {
    longitude: 19.840858,
    latitude: 45.239186
}, {longitude: 19.841212, latitude: 45.239247}, {longitude: 19.841120, latitude: 45.239477}];
export const polygonsCoordinates = [
    [
        {longitude: 19.840782, latitude: 45.239443},
        {longitude: 19.840858, latitude: 45.239186},
        {longitude: 19.841212, latitude: 45.239247},
        {longitude: 19.841120, latitude: 45.239477}
    ],
    [
        {longitude: 19.8384440, latitude: 45.2378003},
        {longitude: 19.8386800, latitude: 45.2373319},
        {longitude: 19.8391145, latitude: 45.2374566},
        {longitude: 19.8388839, latitude: 45.2379061},
        {longitude: 19.8384440, latitude: 45.2378003}
    ]
];
export const testCenter = geolib.getCenter(polygonCoordinates);

export const distanceFromCenterPolygon = (lat, lng, polygon) => {
    if (lat && lng) {
        const center = geolib.getCenter(polygon);
        const distance = geolib.getDistance({latitude: lat, longitude: lng}, center);
        console.log(distance + " meters");
        return distance;
    }
    return 666;
}
