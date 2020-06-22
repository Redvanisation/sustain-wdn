import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../helpers/';

const OrganizationRecord = ({ id, name, email, description, currentUser, setAllOrganizations, allOrganizations }) => {

  const handleDeleteOrganization = () => {
    axios({
      method: 'delete',
      url: `${baseUrl}api/v1/organizations/${id}`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('auth')}`
      }
    })
      .then(() => {
        alert('Organization deleted successfully');
        setAllOrganizations(allOrganizations.filter(org => org.id !== id));
      })
      .catch(() => alert('Can\'t delete organizations with active opportunities!'));
  }

  return (
    <section className="user-record">
      {/* <Link to={{
        pathname: `/user/${id}`,
        user */}
      {/* // }}> */}
      <div>
        <h3 className="user-record__name">
          {name}
        </h3>
        <p className="user-record__email">
          Email: {email}
        </p>
        <p className="user-record__email">
          {description ? description : null}
        </p>
        
      </div>
      {
        currentUser && currentUser.admin
          ? (
            <button className="button is-danger btn mt-3" onClick={() => handleDeleteOrganization()}>
              Delete
            </button>
          ) : null
      }

    </section>
  );
};

export default OrganizationRecord;
