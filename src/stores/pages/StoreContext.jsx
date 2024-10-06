import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(null);

  return (
    <>
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
    </>
  );
};