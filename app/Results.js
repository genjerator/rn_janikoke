import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {fetchResults} from "../axios/ApiCalls";
import {useResults} from "../context/ResultsContext";
import {useUser} from "../context/UserContext";

const Results = ({route}) => {
    const {items, setResults} = useResults();
    const {user, loadUserData} = useUser();
    const [areaNamesPoints, setAreaNamesPoints] = useState([])
    const [sum, setSum] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            try {
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


    useEffect(() => {
        console.log(items, "areaNamesAndPoints");
        let total = 0;
        const test = Object.keys(items).map(key => {
            const challenge = items[key];
            total += challenge.points;
            return {area_name: challenge.area_name, points: challenge.points};
        })
        setSum(total);
        setAreaNamesPoints(test);
        console.log(areaNamesPoints, "areaNamesAndPoints");
    }, [items]);

    const renderItem = ({item}) => (

            <View>
                <Text>{item.area_name}</Text>
                <Text>Points: {item.points}</Text>
            </View>
        )
    ;
    return (
        <View>
            <Text>Score total: {sum}</Text>
            <FlatList
                data={areaNamesPoints}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};


export default Results;
