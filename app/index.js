import {View, Text, Button} from "react-native";
import React, {useEffect, useState} from 'react';
import Challenges from "../component/Challenges";
import {fetchChallengesData} from "../axios/ApiCalls";
import {useChallenges} from "../context/ChallengesContext";
import {useUser} from "../context/UserContext";
import {router} from "expo-router";

const Home = () => {
    const {setChallenges} = useChallenges();
    const {user,loadUserData, clearUser} = useUser();
    const [challengeText,setChallengeText] = useState("");

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
    const fetchData = async () => {
        try {
            const data = await fetchChallengesData(user);
            setChallenges(data)
            setChallengeText("Choose a challenge: ")
        } catch (error) {
            console.error('Error setting data:', error);
        }
    };
    const handleLogout = async () => {
        try {
            clearUser()
            setChallenges([]);
            setChallengeText("Please login to continue ")
        } catch (e) {
            console.log("userlogout", user);
        }
    };
    useEffect(() => {
        setChallengeText("Loading user...");
        loadUserData();
        setChallengeText("Welcome ");
    }, []);
    useEffect(() => {
        console.log("kjkjk",user);


        if (user && user.name) {
            fetchData();
        }else{
            //router.push({pathname: `Login`});
        }
    }, [user]);


    return (
        <>
            <View>
                <Text>{challengeText} {(user && user.name) ?? ''}</Text>
                <Challenges></Challenges>
                {/*<Button title="Refresh" onPress={handleRefresh}></Button>*/}
                <Button title="Results" onPress={handleResults}></Button>
                {(user && user.name) ? (
                    <Button title="Logout" onPress={handleLogout}/>
                ) :<Button title="Login" onPress={handleLogin}/>}
            </View>
        </>
    );
};

export default Home;
