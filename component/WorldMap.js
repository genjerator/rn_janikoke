import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, {Marker, Polygon} from "react-native-maps";
import {processPolygonFromChallenge} from "./Polygons";
import Constants from "expo-constants/src/Constants";
import {postInsidePolygon} from "../axios/ApiCalls";

const WorldMap = ({challenge}) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [polygons, setPolygons] = useState([]);
    const [textx, setTextx] = useState("Loading...");

    //console.log(challenge.polygons,"worldmap");

    useEffect(options => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            let location = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.Highest,
                timeInterval: 5000, // update interval in milliseconds
                distanceInterval: 1, // minimum distance between updates in meters
            }, async (newLocation) => {
                setCurrentLocation(newLocation);
                console.log('Location changed:', newLocation);
                setInitialRegion({
                    latitude: newLocation.coords.latitude,
                    longitude: newLocation.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });


                setTextx(newLocation.timestamp + "::" + newLocation.coords.latitude + ":" + newLocation.coords.longitude);
                const polygonsxxx = await processPolygonFromChallenge(newLocation, challenge)
                console.log(challenge,"CHALLENGE");
                const insidePolygon = polygonsxxx.find(polygon => polygon.inside !== false);
                console.log('insidePolygon:', insidePolygon);
                if (insidePolygon) {
                    console.log("First polygon with inside property true:", insidePolygon);
                    //postInsidePolygon({'user_id':1, 'area_id':insidePolygon.id,'challenge_id':insidePolygon.id})
                    postInsidePolygon({'user_id':1, 'area_id':insidePolygon.inside,'challenge_id':insidePolygon.id})
                } else {
                    console.log("No polygon with inside property true found.");
                }
                // console.log('initialRegion:', initialRegion);
                setPolygons(polygonsxxx);
            });
        };

        getLocation();
    }, []);

    return (

        <View style={{ flex: 1 }}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{textx}</Text>
            </View>
            {initialRegion && (
                <MapView style={styles.map} initialRegion={initialRegion}>
                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.coords.latitude,
                                longitude: currentLocation.coords.longitude,
                            }}
                            title="Your Location"
                        />
                    )}

                    {currentLocation && polygons && polygons.map((polygon, index) => (
                        <Polygon
                            key={index}
                            coordinates={polygon.coords}
                            fillColor={polygon.inside ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)"}
                            strokeColor="rgba(255,0,0,1)"
                            strokeWidth={2}
                        />
                    ))}
                </MapView>
            )}
            {/* Rest of your code */}
        </View>
    );
};
const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: width,
        height: height,

    },
    textContainer: {
        //padding: 10,
        height: 40,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WorldMap;