import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    Vibration,
} from "react-native";
import * as Location from "expo-location";
import MapView, {Marker, Polygon} from "react-native-maps";
import {processPolygonFromChallenge} from "./Polygons";
import {fetchChallengesData, postInsidePolygon} from "../axios/ApiCalls";
import {useUser} from "../context/UserContext";
import {useChallenges} from "../context/ChallengesContext";


const WorldMap = ({challenge}) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [polygons, setPolygons] = useState([]);
    const [textx, setTextx] = useState("Loading...");
    const {user, loadUserData} = useUser();
    const {setChallenges,getChallenges} = useChallenges();
    useEffect(options => {
        loadUserData();
        console.log(user, "user");
        const getLocation = async () => {
            try {
                let {status} = await Location.requestForegroundPermissionsAsync();
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
                     console.log(JSON.stringify(polygonsxxx), "CHALLENGE");
                    const insidePolygon = polygonsxxx.find(polygon => polygon.inside !== false);

                    if (insidePolygon && insidePolygon.inside !== false && insidePolygon.status === 0) {
                        console.log("First polygon with inside property true:", insidePolygon);

                        const ok = postInsidePolygon({
                            'area_id': insidePolygon.inside,
                            'challenge_id': insidePolygon.id
                        }, user)
                        console.log("1111:", ok)
                        if (ok) {
                            try {
                                Vibration.vibrate(1000,false)
                                const data = await fetchChallengesData(user);
                                setChallenges(data)
                            } catch (error) {
                                console.log("sdfsdffds")
                            }
                        }
                    } else {
                        console.log("No polygon with inside property true found.");
                    }
                    setPolygons(polygonsxxx);
                });
            } catch (e) {
                console.log(e)
            }
        };

        getLocation();
    }, []);

    return (

        <View style={{flex: 1}}>
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
                            fillColor={polygon.color}
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