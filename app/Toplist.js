import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {fetchTopList} from "./axios/ApiCalls";
import {useResults} from "./context/ResultsContext";
import {useUser} from "./context/UserContext";

const Toplist = () => {
    const {user} = useUser();
    const [topList, setToplist] = useState([]);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTopList(user);
                setToplist(data);
            } catch (error) {
                console.error('Error setting data:', error);
            }
        };

        try {
            fetchData();
            console.log(topList);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const renderItem = ({item,key}) => (
        <View style={styles.itemContainer}>
            <Text style={styles.user}>{item.name}</Text>
            <Text style={styles.points}>Points: {item.total}</Text>
        </View>
    );

    const toplistRes = Object.entries(topList).map(([key, value]) => ({
        name: key,
        score: value.items,
        total: value.total,
    }));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.totalScore}>Top List</Text>
            </View>
            <View>
                <Text style={styles.totalScore}>Top List</Text>
            </View>
            <FlatList
                data={toplistRes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    header: {
        backgroundColor: '#6200EE',
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    totalScore: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    user: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        textTransform: "capitalize"
    },
    points: {
        fontSize: 16,
        color: '#6200EE',
    },
});

export default Toplist;
