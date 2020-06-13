import React, { createContext } from 'react';
import { useCookies } from 'react-cookie';


export const UserContext = createContext(null);

const UsersProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  return (
    <UserContext.Provider
      value={{
        cookies,
        setCookie,
        removeCookie
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UsersProvider;

