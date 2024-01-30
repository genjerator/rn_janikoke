import { Stack } from "expo-router";
import { ChallengesContext } from '../store/challenges-store';
import axios from "axios";
import { useEffect, useState } from "react";

export const fetchChallengesData = async () => {
    try {
        const response = await axios.get('https://e3ce-178-222-131-33.ngrok-free.app/api/round/1');
        return response.data.data;
    } catch (error) {

    }
};

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
            {/* You might want to pass the actual value of 'item' here */}
            <Stack />
        </ChallengesContext.Provider>
    );
}

export default Layout;
