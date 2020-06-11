import React, { useContext } from 'react';
import UsersSignup from '../components/UserSignup';
import FacilitatorSingup from '../components/FacilitatorSingup';
import Login from '../components/Login';
import { UserContext } from '../providers/UsersProvider';

const Homepage = () => {

  const userCtx = useContext(UserContext);

  console.log(userCtx.cookies.user)
  return (
    <div className="homepage">
      <UsersSignup />
      {/* <FacilitatorSingup />
      <Login /> */}
    </div>
  )
}

export default Homepage;
