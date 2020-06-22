import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../helpers/';

const OpportunityRecord = ({ id, name, description, type, related_field, opportunities, setOpportunities }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const handleDeleteOpportunity = () => {
    axios({
      method: 'delete',
      url: `${baseUrl}api/v1/opportunities/${id}`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('auth')}`
      }
    })
      .then(() => {
        alert('Opportunity deleted successfully');
        setOpportunities(opportunities.filter(opp => opp.id !== id));
      })
      .catch(() => alert('Error deleting the user'));
  }

  return (
    <section className="user-record">
      <Link to={`/opportunity/${id}`}>
      {/* <Link to="#"> */}
        <h3 className="user-record__name">
          {name}
        </h3>
        <p className="user-record__email">
          Type: {type}
        </p>
        <p className="user-record__email">
          Field: {related_field}
        </p>
        <p className="user-record__email">
          {description}
        </p>
      </Link>
      {
        currentUser && currentUser.role === 'organization'
          ? (
            <button className="button is-danger btn mt-3" onClick={() => handleDeleteOpportunity()}>
              Delete
            </button>
          ) : null
      }

    </section>
  );
};

export default OpportunityRecord;
