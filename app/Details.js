// Detail.js
import React, {useContext} from 'react';
import { View, Text } from 'react-native';
import {useLocalSearchParams} from "expo-router";
import Challenge from "../component/Challenge";
import { ChallengesContext } from "../store/challenges-store";

const Detail = ( {route}) => {
    const challengeId = useLocalSearchParams();

    const {item} = useContext(ChallengesContext);
    const findChallengeById = item.find(
        (challenge) => challenge.id === parseInt(challengeId.challenge_id)
    );
    console.log(challengeId,"details",findChallengeById);
    return (
        <View>
            <Text>Detail Screen22</Text>
            <Challenge challenge={findChallengeById}></Challenge>
        </View>
    );
};


export default Detail;
