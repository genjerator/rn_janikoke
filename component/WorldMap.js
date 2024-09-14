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
import {getPolygonColor, processPolygonFromChallenge, waitForChallengesData} from "./Polygons";
import {fetchChallengesData, postInsidePolygon} from "../axios/ApiCalls";
import {useUser} from "../context/UserContext";
import {useChallenges} from "../context/ChallengesContext";


const WorldMap = ({challenge}) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [polygons, setPolygons] = useState([]);
    const [textx, setTextx] = useState("Loading...");
    const {user, loadUserData} = useUser();
    const {setChallenges, getChallenges} = useChallenges();
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
                    //distanceInterval: 1, // minimum distance between updates in meters
                }, async (newLocation) => {
                    setCurrentLocation(newLocation);
                    console.log('Location changed:', newLocation, new Date().toLocaleString());
                    setInitialRegion({
                        latitude: newLocation.coords.latitude,
                        longitude: newLocation.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    });
                    await setTextx(newLocation.timestamp + ":" + newLocation.coords.latitude + ":" + newLocation.coords.longitude);
                    var polygonsxxx = await processPolygonFromChallenge(newLocation, challenge)
                    setPolygons(polygonsxxx);
                    const insidePolygon = await polygonsxxx.find(polygon => polygon.inside !== false);
                    await console.log("insidePolygons:", insidePolygon);
                    if (insidePolygon && insidePolygon.inside !== false && insidePolygon.status === 0) {
                        console.log("First polygon with inside property true:", insidePolygon);
                        console.log("2222:", insidePolygon.inside, insidePolygon.status, getPolygonColor(insidePolygon.inside, insidePolygon.status));

                        var ok = true;
                        ok = await postInsidePolygon({
                            'area_id': insidePolygon.inside,
                            'challenge_id': insidePolygon.id
                        }, user)
                        console.log("ssssssaarsssssssss:", ok);


                        if (ok===true && insidePolygon && insidePolygon.inside !== false && insidePolygon.status === 0) {
                            await Vibration.vibrate(1000, false)
                            //Vibration.cancel();
                            await delayxx(5000); // Wait for 5 seconds
                            polygonsxxx = await processInside(insidePolygon,polygonsxxx);
                            setPolygons(polygonsxxx);
                            console.log(polygonsxxx, ok);
                        }
                    } else {
                        console.log("No polygon with inside property true found.");
                    }
                })
            } catch (e) {
                console.log(e);
            }
        };

        getLocation();
    }, []);
    const vibrateIfTrue = (condition) => {
        if (condition) {
            Vibration.vibrate(500); // Vibrates for 500 milliseconds (0.5 sec)
        }
    };
    const delayxx = (ms) => {
        return new Promise((resolve) =>
            setTimeout(resolve, ms));
    };
    const processInside = (insidePolygon, polygonsxxx) => {
        try {
            console.log("before vibrate:x", new Date().getTime());


            insidePolygon.status = 1;
            insidePolygon.color = getPolygonColor(true, insidePolygon.status);
            console.log("after vibrateeeeeeee:", new Date().getTime());
            const t =  polygonsxxx.map(item => {
                if (item.area_id === insidePolygon.area_id) {
                    return insidePolygon;
                }
                return item;
            });
            console.log("after vibrats:", t);
            return t;
        } catch (error) {
            console.log("ERRRROR",error)
        }
    }
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