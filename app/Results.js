import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {fetchResults} from "../axios/ApiCalls";
import {useResults} from "../context/ResultsContext";
import {useUser} from "../context/UserContext";

const Results = ({route}) => {
    const {items, setResults, sumPoints} = useResults();
    const { user, loadUserData } = useUser();
    useEffect(() => {
        const fetchData = async () => {
            try {
                loadUserData();
                console.log(user,"UUUSSEEERRR");
                const data = await fetchResults(user);
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
