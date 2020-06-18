import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../helpers/';

const PathwayRecord = ({ pathway }) => {


  // const handleDeleteUser = () => {
  //   axios({
  //     method: 'delete',
  //     url: `${baseUrl}api/v1/users/${user.id}`,
  //     data: {
  //       id: user.id
  //     },
  //     headers: {
  //       "Authorization": `Bearer ${localStorage.getItem('auth')}`
  //     }
  //   })
  //     .then(() => {
  //       alert('User deleted successfully');
  //       setAllUsers(allUsers.filter(usr => usr.id !== user.id));
  //     })
  //     .catch(() => alert('Error deleting the user'));
  // }

  const setPathway = () => {
    localStorage.setItem('pathway', JSON.stringify(pathway));
  };

  return (
    <Link to={`/pathway/${pathway.id}`} 
      className="pathway-record"
      onClick={setPathway}  
    >

      <p className="pathway-record__id mb-1">
        Pathway number: {pathway.id}
      </p>

      <h3 className="pathway-record__title title is-5 mt-1">
        {pathway.title}
      </h3>

      <p className="pathway-record__subtitle subtitle is-6">
        {pathway.subtitle}
      </p>
    </Link>
  );
};

export default PathwayRecord;
