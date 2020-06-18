import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../helpers/';
import PathwayRecord from '../components/PathwayRecord';

const UserPathwaysPage = () => {
  const [pathways, setPathways] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    if (currentUser) {
      const getPathways = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}api/v1/pathways`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        });

        setPathways(response.data);
        setIsLoading(false);
      }

      getPathways();
    }
  }, []);

  return (
    <div>
      <h2 className="title is-2 is-centered mt-2">All pathways</h2>
      {
        !isLoading
          ? (
            pathways.map(pathway => <PathwayRecord 
                key={pathway.id}
                pathway={pathway}
              />)
          ) : 'Loading...'
      }
    </div>
  );
};

export default UserPathwaysPage;
