import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {fetchResults} from "../axios/ApiCalls";
 import {useResults} from "../context/ResultsContext";
 import {useUser} from "../context/UserContext";

const Results = ({route}) => {
    const {setResults, sumPoints} = useResults();
    const {loadUserData} = useUser();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = loadUserData();
                const data = await fetchResults(user);

                setResults(data)

                console.log("data", data);
            } catch (error) {
                console.error('Error setting data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <View>
            <Text>Results Screen</Text>
            <View><Text>{sumPoints()}</Text></View>
        </View>
    );
};


export default Results;
