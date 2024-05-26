import React, { createContext, useContext, useState } from 'react';

const ResultsContext = createContext();

const ResultsProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const setResults = (items) => {
        setItems(items);
    };
    // const addResults = (items) => {
    //     setItems(items);
    // };
    const sumPoints = ()  => {
        console.log("resultxxx",items);
        if(!items){
            return 0
        }
        return Object.values(items).reduce((sum, challenge) => sum + challenge.points, 0);
    };

    return (
        <ResultsContext.Provider value={{ items, setResults,sumPoints }}>
            {children}
        </ResultsContext.Provider>
    );
};

const useResults = () => {
    return useContext(ResultsContext);
};

export { ResultsProvider, useResults };