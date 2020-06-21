import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { baseUrl } from '../helpers/';
import OpportunityRecord from '../components/OpportunityRecord';

const OrganizationPage = () => {
  const [organization, setOrganization] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [opportunities, setOpportunities] = useState([]);

  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [showOpportunities, setShowOpportunities] = useState(false);

  useLayoutEffect(() => {
    if (currentUser.role !== 'organization') {
      history.push('/auth');
    }
  });

  useEffect(() => {
    if (currentUser) {
      const getOrganization = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}api/v1/organizations/${currentUser.user_id}`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        });

        setOrganization(response.data);
        setIsLoading(false);
      }

      getOrganization();
    }
  }, []);

  const fetchUsers = () => {
    // setShowContainer(true);
    setShowOpportunities(true) 
      axios({
        method: 'get',
        url: `${baseUrl}api/v1/opportunities`,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then(res => setOpportunities(res.data))
        .catch(() => alert('Error getting the users list'));
  };

  return (
    <main className="facilitator">
      {
      isLoading
        ? (
          'Loading...'
        )
        : (
          <>
            <header className="facilitator__header title is-3 is-bold">
              <h3 className="facilitator__header--title">Welcome back <span className="facilitator__header--username">{organization.name}</span>!</h3>
            </header>
      
            <section className="facilitator__profile-section">
      
              <div className="facilitator__profile-section--image-div">
                <h3 className="facilitator__profile-section--title subtitle is-5">{organization.name}</h3>

                <div className="facilitator__profile-section--image" style={{'content':`url(${organization.image ? organization.image.url : null})`}} />
                <Link to="/edit/organization" className="facilitator__profile-section--edit-btn">Edit my profile</Link>
                <Link to="/add/opportunity" className="facilitator__profile-section--edit-btn">Add Opportunity</Link>
                <button className="facilitator__profile-section--edit-btn-button" onClick={() => fetchUsers()}>View Opportunities</button>
              </div>
              <div className={showOpportunities ? "facilitator__profile-section--users-container" : "facilitator__profile-section--users-container hidden"}>
                <h3 className="facilitator__profile-section--title title is-3">Opportunities</h3>
                {opportunities.map(opp => <OpportunityRecord 
                    key={opp.id}
                    id={opp.id}
                    name={opp.name}
                    description={opp.description}
                    type={opp.type}
                    related_field={opp.related_field}
                    opportunity={opp}
                    opportunities={opportunities}
                    setOpportunities={setOpportunities}
                  />)}
              </div>

            </section>
          </>
        )
      }

    </main>
  );
};

export default OrganizationPage;
