import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../helpers/';

const UserRecord = ({ id, name, email, activePathway, user, currentUser, setAllUsers, allUsers }) => {

  const handleDeleteUser = () => {
    axios({
      method: 'delete',
      url: `${baseUrl}api/v1/users/${user.id}`,
      data: {
        id: user.id
      },
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('auth')}`
      }
    })
      .then(() => {
        alert('User deleted successfully');
        setAllUsers(allUsers.filter(usr => usr.id !== user.id));
      })
      .catch(() => alert('Error deleting the user'));
  }

  return (
    <section className="user-record">
      <Link to={{
        pathname: `/user/${id}`,
        user
      }}>
        <h3 className="user-record__name">
          Name: {name}
        </h3>
        <p className="user-record__email">
          Email: {email}
        </p>
        <p className="user-record__pathway">
          Active Pathway: <span className="text-important">{activePathway ? activePathway : 'No active pathway yet'}</span>
        </p>
      </Link>
      {
        currentUser && currentUser.admin
          ? (
            <button className="button is-danger btn mt-3" onClick={() => handleDeleteUser()}>
              Delete
            </button>
          ) : null
      }

    </section>
  );
};

export default UserRecord;
