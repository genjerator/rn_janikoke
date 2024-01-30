import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import Constants from 'expo-constants';


const WorldMap = ({location, polygons}) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [isMapReady, setIsMapReady] = useState(false);
    console.log(polygons,"polygons");
    useEffect(() => {
        // Update state when the location prop changes
        if (location?.coords) {
            setLat(location.coords.latitude);
            setLng(location.coords.longitude);
        }

    }, [location]);
    const onMapLayout = (ready) => {
        setIsMapReady(ready)
    };
    return (
        <MapView
            region={{
                latitude: lat ?? 45,
                longitude: lng ?? 19,

            }}
            onMapReady={() => onMapLayout(true)}
            loadingIndicatorColor="#e21d1d"
            style={{
                width,
                height,
            }}
            loadingEnabled={true}
        >
            {(isMapReady && lat && lng) && <Marker
                //key="your key"
                identifier="marker"
                coordinate={{
                    latitude: lat,
                    longitude: lng
                }}
                flat={true}
            />
            }
            {(isMapReady && lat && lng) && polygons.map((polygon, index) => (
                <Polygon
                    key={index}
                    coordinates={polygon.coords}
                    fillColor={polygon.inside ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)"}
                    strokeColor="rgba(255,0,0,1)" // Borde
                    strokeWidth={2}
                />
            ))}
        </MapView>
    );
};
const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    map: {
        flex: 1,
        height: height,
        width: width,
        marginTop: Constants.statusBarHeight, // Adjust for the status bar on Android
    },
});

export default WorldMap;
