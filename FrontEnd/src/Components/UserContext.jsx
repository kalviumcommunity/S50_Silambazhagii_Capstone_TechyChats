import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{"a":"v"}}>
      {children}
    </UserContext.Provider>
  );
};

// export default UserContext;÷
