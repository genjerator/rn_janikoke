import * as geolib from "geolib";


export const polygonCoordinates = [{longitude: 19.840782, latitude: 45.239443}, {
    longitude: 19.840858,
    latitude: 45.239186
}, {longitude: 19.841212, latitude: 45.239247}, {longitude: 19.841120, latitude: 45.239477}];
export const polygonsCoordinates = [

    [
        {longitude: 19.4723957, latitude: 44.2208144},
        {longitude: 19.4718119, latitude: 44.2193685},
        {longitude: 19.4690957, latitude: 44.2200148}
    ],

    [
        {longitude: 19.8384440, latitude: 45.2378003},
        {longitude: 19.8386800, latitude: 45.2373319},
        {longitude: 19.8391145, latitude: 45.2374566},
        {longitude: 19.8388839, latitude: 45.2379061},
        {longitude: 19.8384440, latitude: 45.2378003}
    ],
    [
        {longitude: 19.8416734, latitude: 45.2356698},
        {longitude: 19.8420113, latitude: 45.2347329},
        {longitude: 19.843685, latitude: 45.2349596},
        {longitude: 19.8431325, latitude: 45.2360022},
        {longitude: 19.8416734, latitude: 45.2356698}
    ],
    [
        {longitude: 19.840782, latitude: 45.239443},
        {longitude: 19.840858, latitude: 45.239186},
        {longitude: 19.841212, latitude: 45.239247},
        {longitude: 19.841120, latitude: 45.239477}
    ]
];

export const polygoneer = (location = []) => {
    return polygonsCoordinates.map((coords, index) => ({
        coords: coords,
        id: index + 1,
        name: `Polygon ${index + 1}`,
        distanceFromCenter: distanceFromCenterPolygon(location?.coords?.latitude, location?.coords?.longitude, coords),
        inside: geolib.isPointInPolygon({
            latitude: (location && location.coords && location.coords.latitude) ?? 45.8,
            longitude: (location && location.coords && location.coords.longitude) ?? 9.3,
        }, coords)
    }));
}

export const processPolygonFromChallenge = (location = [], challenge) => {
    console.log(challenge,"ccc");
    return challenge.areas.map((polygons, index) => ({
        coords: polygons,
        id: challenge.id,
        name: challenge.title,
        distanceFromCenter: 888,//distanceFromCenterPolygon(location?.coords?.latitude, location?.coords?.longitude, challenge.polygons),
        inside: geolib.isPointInPolygon({
            latitude: (location && location.coords && location.coords.latitude) ?? 45.8,
            longitude: (location && location.coords && location.coords.longitude) ?? 9.3,
        }, polygons)
    }));
}
export const testCenter = geolib.getCenter(polygonCoordinates);

export const distanceFromCenterPolygon = (lat, lng, polygon) => {
    if (lat && lng) {
        const center = geolib.getCenter(polygon);
        return geolib.getDistance({latitude: lat, longitude: lng}, center);
    }
    return 666;
}
