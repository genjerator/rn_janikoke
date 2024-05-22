import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {fetchResults} from "../axios/ApiCalls";
import {useResults} from "../context/ResultsContext";
import {useChallenges} from "../context/ChallengesContext";

const Results = ({route}) => {
    const {items, setResults, sumPoints} = useResults();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchResults();
                setResults(data)
                console.log("results", items);
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
