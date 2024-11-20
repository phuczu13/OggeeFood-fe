import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [storeData, setStoreData] = useState(null);

    return (
        <StoreContext.Provider value={{ storeData, setStoreData }}>
            {children}
        </StoreContext.Provider>
    );
};
