
import React, {useEffect, useState,useContext} from 'react';
import {View, FlatList} from 'react-native';
import ChallengeListItem from './list/ChallengeListItem';
import {router} from "expo-router";
import axios from "axios";
import {ChallengesContext} from "../store/challenges-store"

const Challenges = () => {
    const {item} = useContext(ChallengesContext);
    console.log(item,"Item");
    const handlePressItem = ({item}) => {
        console.log(item.id,"SDSDS");
        router.push({pathname: `Details`, params: {"challenge_id":item.id}}); // Remove the braces in params
    };

    return (
        <View>
            <FlatList
                data={item}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ChallengeListItem item={item} onPressItem={handlePressItem}/>}
            />
        </View>
    );
};

export default Challenges;
