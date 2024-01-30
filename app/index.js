import {View, Text} from "react-native";
import React, {useEffect, useState} from 'react';
import Challenges from "../component/Challenges";

const Home = () => {
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
