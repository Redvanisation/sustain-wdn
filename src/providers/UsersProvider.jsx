import React, { useState, createContext } from 'react';
import { useCookies } from 'react-cookie';


export const UserContext = createContext(null);

const UsersProvider = ({ children }) => {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider
      value={{
        // cookies,
        // setCookie,
        // removeCookie
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UsersProvider;

