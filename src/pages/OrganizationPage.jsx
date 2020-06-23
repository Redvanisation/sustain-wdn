import React, { useContext, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { UserContext } from '../providers/UsersProvider';

const OrganizationPage = () => {

  // const userCtx = useContext(UserContext);
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user'));


  useLayoutEffect(() => {
    if (!currentUser) {
      history.push('/auth');
    }
  });

  return (
    <div>Organization Page</div>
  );
};

export default OrganizationPage;
