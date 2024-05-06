import React, { createContext, useContext, useState } from 'react';

const ChallengesContext = createContext();

const ChallengesProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const setChallenges = (items) => {
        setItems(items);
    };


    return (
        <ChallengesContext.Provider value={{ items, setChallenges }}>
            {children}
        </ChallengesContext.Provider>
    );
};

const useChallenges = () => {
    return useContext(ChallengesContext);
};

export { ChallengesProvider, useChallenges };