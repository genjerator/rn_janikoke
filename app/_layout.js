import { Stack } from "expo-router";
import { ChallengesContext } from '../store/challenges-store';
import { useEffect, useState } from "react";
import {fetchChallengesData} from "../axios/ApiCalls";



const Layout = () => {
    const [items, setItems] = useState({
        item: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchChallengesData();
                setItems({ item: data });
            } catch (error) {
                // Handle error
                console.error('Error setting data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ChallengesContext.Provider value={items}>
            <Stack />
        </ChallengesContext.Provider>
    );
}

export default Layout;
