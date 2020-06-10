import React from 'react';
import UsersSignup from '../components/UserSignup';
import FacilitatorSingup from '../components/FacilitatorSingup';
import Login from '../components/Login';

const Homepage = () => {
  return (
    <div className="homepage">
      <UsersSignup />
      <FacilitatorSingup />
      <Login />
    </div>
  )
}

export default Homepage;
