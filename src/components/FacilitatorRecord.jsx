import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../helpers/';

const FacilitatorRecord = ({ id, name, email, user, setAllUsers, allUsers }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      const getUsers = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}/api/v1/youth-count/${user.id}`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        });

        setUsers(response.data);
      }

      getUsers();
  }, []);

  const handleDeleteUser = () => {
    axios({
      method: 'delete',
      url: `${baseUrl}api/v1/facilitators/${user.id}`,
      data: {
        id: user.id
      },
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('auth')}`
      }
    })
      .then(() => {
        alert('Facilitator deleted successfully');
        setAllUsers(allUsers.filter(usr => usr.id !== user.id));
      })
      .catch(() => {
        if (users.length > 0) {
          alert('Please assign the users to another facilitator before doing that!')
        } else {
          alert('Error deleting the facilitator');
        }
      });
  }

  return (
    <section className="user-record">
      <div>
        <h3 className="user-record__name">
          Name: {name}
        </h3>
        <p className="user-record__email">
          Facilitator Code: {id}
        </p>
        <p className="user-record__email">
          Email: {email}
        </p>
        <p className="user-record__email">
          Assigned Users: {users.length}
        </p>

      </div>
      <button className="button is-danger btn mt-3" onClick={() => handleDeleteUser()}>
        Delete
      </button>

    </section>
  );
};

export default FacilitatorRecord;
