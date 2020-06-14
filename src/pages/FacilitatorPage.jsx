import React, { useContext, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../providers/UsersProvider';

const FacilitatorPage = () => {

  const userCtx = useContext(UserContext);
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};


  useLayoutEffect(() => {
    if (!currentUser) {
      history.push('/auth');
    }
  });

  return (
    <div>Facilitator Page</div>
  );
};

export default FacilitatorPage;
