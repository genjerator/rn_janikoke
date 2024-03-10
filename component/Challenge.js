import {View, Text} from "react-native";
import React, {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import moment from 'moment';
import WorldMap from '../component/WorldMap'
import {
    distanceFromCenterPolygon,
    processPolygonFromChallenge
} from "./Polygons";

const Challenge = ({challenge}) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [currentTimestamp, setCurrentTimestamp] = useState(moment.now());
    console.log(challenge,"challenge");
    let text = 'Waiting...';

    if (errorMsg) {
        text = errorMsg;
    } else {
        const formattedTime = moment(currentTimestamp).format('HH:mm:ss');
        text = `time: ${formattedTime} `;
    }
    return (
        <>
            <View>
                <WorldMap  style={{flex: 1}}
                    challenge={challenge}
                />
            </View>
        </>
    );
};

export default Challenge;
