
import React, {useEffect, useState,useContext} from 'react';
import {View, FlatList, Button} from 'react-native';
import ChallengeListItem from './list/ChallengeListItem';
import {router} from "expo-router";
import axios from "axios";
import {ChallengesContext} from "../store/challenges-store"
import {useChallenges} from "../context/ChallengesContext";
import {fetchChallengesData} from "../axios/ApiCalls";

const Challenges = () => {
    const { items, setChallenges } = useChallenges();

    const handlePressItem = ({item}) => {
        console.log(item.id,"SDSDS");
        router.push({pathname: `Details`, params: {"challenge_id":item.id}}); // Remove the braces in params
    };
    const handleRefresh = async () => {
        await fetchChallengesData();
    };

    return (
        <View>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ChallengeListItem item={item} onPressItem={handlePressItem}/>}
            />
            <Button title="Refresh" onPress={handleRefresh}></Button>
        </View>
    );
};

export default Challenges;
