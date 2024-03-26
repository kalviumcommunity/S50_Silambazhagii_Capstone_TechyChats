import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const storeUserData = (data) => {
    setUserData(data);
  };

  return (
    <UserContext.Provider value={{ userData, storeUserData }}>
      {children}
    </UserContext.Provider>
  );
};
