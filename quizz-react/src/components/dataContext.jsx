import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

// Export a custom hook to use the context
export const useData = () => useContext(DataContext);

// Create the provider component
export const DataProvider = ({ children }) => {
  const [userDataContext, setUserDataContext] = useState(null); 

  return (
    <DataContext.Provider value={{ userDataContext, setUserDataContext }}>
      {children}
    </DataContext.Provider>
  );
};
