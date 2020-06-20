import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../helpers/';
import PathwayRecord from '../components/PathwayRecord';

const UserPathwaysPage = () => {
  const [pathways, setPathways] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  const user = JSON.parse(localStorage.getItem('user-answered')) || {};
  const columns = ['fav_subjects', 'fav_activities', 'soft_skills', 'support_types', 'eager_scale']

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


  const getUserArray = () => {

    const filterUserPathways = pathways.filter(pathway => {
      if (pathway.education_levels.includes(user.education_level)) {
          return pathway;
        }
      });

    let desired = columns.map(col => {
      if (user[col]) {
        return {[col]: user[col]};
      }
    });


    const finalPathways = [];

    filterUserPathways.forEach(pathway => {
      columns.forEach((column, i) => {
        if (pathway[column] === desired[column]) {
          if (finalPathways.indexOf(pathway) === -1){
            finalPathways.push(pathway)
          }
        }
      });
    });

    return finalPathways;
  };

  const renderPathways = () => {
    if (isLoading) {
      return 'Loading...'
    } else if (!isLoading && currentUser.role === 'user') {
      return (
        getUserArray().map(pathway => <PathwayRecord 
          key={pathway.id}
          pathway={pathway}
        />)
      );
    } else {
      return (
        pathways.map(pathway => <PathwayRecord 
          key={pathway.id}
          pathway={pathway}
        />)
      );
    }
  }

  return (
    <div>
      <h2 className="title is-2 is-centered mt-2">All pathways</h2>
      {
        renderPathways()
      }
    </div>
  );
};

export default UserPathwaysPage;
