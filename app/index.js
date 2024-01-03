import {View, Text, Vibration,} from "react-native";
import React, {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import moment from 'moment';
import WorldMap from '../component/WorldMap'
import {distanceFromCenterPolygon, polygoneer, polygonsCoordinates} from "../component/Polygons";

const Home = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [currentTimestamp, setCurrentTimestamp] = useState(moment.now());

    useEffect(() => {
        const getLocation = async () => {
            try {
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);


            } catch (error) {
                console.error('Error getting location:', error);
            }
        };

        // Get initial location
        getLocation();

        // Set up a location tracking interval
        const intervalId = setInterval(() => {
            setCurrentTimestamp(moment.now());
            getLocation();
        }, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        const distanceTest = distanceFromCenterPolygon(location.coords.latitude, location.coords.longitude, polygonsCoordinates[0]);
        const formattedTime = moment(currentTimestamp).format('HH:mm:ss');
        text = `time: ${formattedTime} ,Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}, Distance: ${distanceTest} meter`;
    }
    return (
        <>
            <View>
                <Text>{text}</Text>
            </View>
            <View style={{flex: 1}}>
                <WorldMap location={location} polygons={polygoneer(location)??[]} />
            </View>
        </>
    );
};

export default Home;
