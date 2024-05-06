import {View, Text} from "react-native";
import React, {useEffect, useState} from 'react';
import Challenges from "../component/Challenges";
import {fetchChallengesData} from "../axios/ApiCalls";
import {useChallenges} from "../context/ChallengesContext";

const Home = () => {
    const { items,setChallenges } = useChallenges();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchChallengesData();
                setChallenges(data)
            } catch (error) {
                console.error('Error setting data:', error);
            }
        };

        fetchData();
    }, []);
    console.log(items,"itemsssssss");
    return (
        <>
            <View>
                <Text>Choose a challenge</Text>
                <Challenges></Challenges>
            </View>
        </>
    );
};

export default Home;
