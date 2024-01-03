import React, {useState,useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import Constants from 'expo-constants';
import * as geolib from "geolib";

const WorldMap = ({ location, polygons }) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [inside, setInside] = useState(false);
    const [polygonsArea, setPolygonsArea] = useState([]);
    useEffect(() => {
        // Update state when the location prop changes
        if (location?.coords) {
            setLat(location.coords.latitude);
            setLng(location.coords.longitude);
            const test = geolib.isPointInPolygon({latitude: location.coords.latitude, longitude: location.coords.longitude}, polygonsArea[0]);
            setInside(test);

        }
        if(polygons)
        {
            setPolygonsArea(polygons)
        }

    }, [polygons,location]);

    return (
        <MapView
            style={styles.map}
            region={{
                longitude:  lng ?? 19.8388839,
                latitude:  lat ?? 45.2378003,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >

                <>
                    <Marker
                        coordinate={{
                            latitude: lat ?? 45.2378003,
                            longitude: lng ?? 19.8388839,
                        }}
                        title="Polygon Center"
                    />
                </>


            {polygonsArea.map((p, index) => (
                <Polygon
                    key={index}
                    coordinates={p.coords}
                    fillColor={p.inside ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)"}
                    strokeColor="rgba(255,0,0,1)"
                    strokeWidth={2}
                />
            ))}
        </MapView>
    );

};

const styles = StyleSheet.create({
    map: {
        flex: 1,
        marginTop: Constants.statusBarHeight, // Adjust for the status bar on Android
    },
});

export default WorldMap;
