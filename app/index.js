import {View, Text, Button} from "react-native";
import React, {useEffect, useState} from 'react';
import Challenges from "../component/Challenges";
import {fetchChallengesData} from "../axios/ApiCalls";
import {useChallenges} from "../context/ChallengesContext";
import {useUser} from "../context/UserContext";
import {router} from "expo-router";

const Home = () => {
    const {setChallenges} = useChallenges();
    const {user, loadUserData, clearUser} = useUser();

    const handleRefresh = async () => {

        try {
            await fetchChallengesData();
        } catch (e) {
            console.log(e);
        }
    };
    const handleResults = async () => {
        router.push({pathname: `Results`});
    };
    const handleLogin = async () => {
        router.push({pathname: `Login`});
    };
    const handleLogout = async () => {
        try {
            clearUser()
        } catch (e) {
            console.log("userlogout", user);
        }
    };

    useEffect(() => {
        loadUserData();
        const fetchData = async () => {
            try {
                const data = await fetchChallengesData(user);
                setChallenges(data)
            } catch (error) {
                console.error('Error setting data:', error);
            }
        };

        fetchData();
        console.log("kjkjk",user);
        if(user && user.name){

        }else{
            router.push({pathname: `Login`});
        }
    }, []);


    return (
        <>
            <View>
                <Text>Choose a challenge {(user && user.name) ?? ''}</Text>
                <Challenges></Challenges>
                {/*<Button title="Refresh" onPress={handleRefresh}></Button>*/}
                <Button title="Results" onPress={handleResults}></Button>
                {(user && user.name) ? (
                    <Button title="Logout" onPress={handleLogout}/>
                ) :""}
            </View>
        </>
    );
};

export default Home;
