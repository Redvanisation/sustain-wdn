import React, { useContext, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../providers/UsersProvider';

const YouthPage = () => {

  const userCtx = useContext(UserContext);
  const history = useHistory();

  // useLayoutEffect(() => {
  //   if (!userCtx.cookies.user) {
  //     history.push('/auth');
  //   }
  // });

  return (
    <div>Youth Page</div>
  );
};

export default YouthPage;
