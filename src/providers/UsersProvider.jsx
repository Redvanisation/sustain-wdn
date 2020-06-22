import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { baseUrl } from '../helpers/';


export const UserContext = createContext(null);

const UsersProvider = ({ children }) => {
  const [pathways, setPathways] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};


  useEffect(() => {
    if (currentUser) {
      const getPathways = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}/api/v1/pathways`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        });
        
        localStorage.setItem('the-pathways', JSON.stringify(response.data));
        setPathways(response.data);
      }
  
      getPathways();
    }
  }, []);


  return (
    <UserContext.Provider
      value={{
        pathways,
        setPathways
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UsersProvider;

