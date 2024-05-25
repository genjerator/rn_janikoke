
import React from 'react';
import {View, FlatList, Button} from 'react-native';
import ChallengeListItem from './list/ChallengeListItem';
import {router} from "expo-router";
import {useChallenges} from "../context/ChallengesContext";
import {fetchChallengesData} from "../axios/ApiCalls";

const Challenges = () => {
    const { items } = useChallenges();

    const handlePressItem = ({item}) => {
        console.log(item.id,"SDSDS");
        router.push({pathname: `Details`, params: {"challenge_id":item.id}}); // Remove the braces in params
    };
    const handleRefresh = async () => {
        await fetchChallengesData();
    };
    const handleResults = async () => {
        router.push({pathname: `Results`});
    };
    const handleLogin = async () => {
        router.push({pathname: `Login`});
    };
    return (
        <View>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ChallengeListItem item={item} onPressItem={handlePressItem}/>}
            />
            <Button title="Refresh" onPress={handleRefresh}></Button>
            <Button title="Results" onPress={handleResults}></Button>
            <Button title="Login" onPress={handleLogin}></Button>
        </View>
    );
};

export default Challenges;
