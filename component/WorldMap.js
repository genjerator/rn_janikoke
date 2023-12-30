// WorldMap.js
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import Constants from 'expo-constants';
import * as geolib from 'geolib';
import * as testPolygons from './Polygons';
import {polygonCoordinates, polygonsCoordinates,distanceFromCenterPolygon} from "./Polygons";
const WorldMap = ({ location, polygons }) => {


    const lat = location && location.location && location.location.coords && location.location.coords.latitude;
    const lng = location && location.location && location.location.coords && location.location.coords.longitude;
    //load test polygons

    const testPolygon = polygonCoordinates;
    const testPolygons = polygonsCoordinates;



    //console.log("polygons",polygons.polygons);
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                longitude: 19.8388839,
                latitude: 45.2378003,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {lng && lat && (
                <>
                    <Text>Init...</Text>
                    <Marker
                        coordinate={{
                            latitude: lat,
                            longitude: lng,
                        }}
                        title="Polygon Center"
                    />
                </>
            )}

            {polygons.map((polygon, index) => (
                <Polygon
                    key={index}
                    coordinates={polygon}
                    fillColor={polygon.inside ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)"}
                    strokeColor="rgba(255,0,0,1)" // Borde
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
