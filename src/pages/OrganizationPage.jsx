/* eslint-disable react-hooks/exhaustive-deps */
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

            <section className="youth__profile-section">

            <div className="youth__profile-section--bio-div">
                  <div className="youth__profile-section--bio-container">
                    <h3 className="youth__profile-section--title">Description</h3>
                    <p className="youth__profile-section--bio-text">
                      {organization.description ? organization.description : 'Edit your profile to set up your description'}
                    </p>
                  </div>

                  <div className="youth__profile-section--bottom-container">

                    <div className="youth__profile-section--bottom-div">
                      <h3 className="youth__profile-section--title">Internships</h3>
                      <p className="youth__profile-section--bio-text">
                        {organization.interships ? 'Yes' : 'Edit your profile to set up wheither or not you have active internships'}
                      </p>
                    </div>

                    <div className="youth__profile-section--bottom-div">
                      <h3 className="youth__profile-section--title">Jobs</h3>
                      <p className="youth__profile-section--bio-text">
                        {organization.jobs ? 'Yes' : 'Edit your profile to set up wheither or not you have active jobs'}
                      </p>
                    </div>

                    <div className="youth__profile-section--bottom-div">
                      <h3 className="youth__profile-section--title">Other Opportunities</h3>
                      <p className="youth__profile-section--bio-text">
                        {organization.other_opportunities ? 'Yes' : 'Edit your profile to set up wheither or not you have any active opportunities'}
                      </p>
                    </div>
                  </div>

                </div>
              </section>
          </>
        )
      }

    </main>
  );
};

export default OrganizationPage;
