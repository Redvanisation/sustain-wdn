/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../helpers/';

const OpportunityPage = (props) => {
  const [opportunity, setOpportunity] = useState([]);
  const [organization, setOrganization] = useState('');
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  const id = props.match.params.id;


  useLayoutEffect(() => {
    if (!currentUser) {
      history.push('/auth');
    }
  });

  // console.log(props.match.params.id)

  useEffect(() => {
    if (currentUser) {
      const getOpportunity = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}api/v1/opportunities/${id}`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        });

        setOpportunity(response.data.opportunity);
        setOrganization(response.data.opportunity_organization);
      }

      getOpportunity();
      
    }
  }, []);


  return (
    <main className="pathway">
      <header className="pathway__header" style={{background: 'radial-gradient(rgba(32, 154, 206,.9) 50%, rgba(32, 154, 206, .5))'}}>
        <h2 className="pathway__header--title title is-2">
          {organization}
        </h2>
      </header>

      <section className="pathway__content">
        <h3 className="pathway__content--title title is-3">
          About {opportunity.title} Opportunity
        </h3>
        <p className="pathway__content--description">
          {opportunity.description}
        </p>

        <h3 className="pathway__content--title title is-3">
          Type
        </h3>
        <div className="pathway__content--description content">
          {opportunity.type}
        </div>

        <h3 className="pathway__content--title title is-3">
          Field
        </h3>
        <div className="pathway__content--description content">
          {opportunity.related_field}
        </div>

        {/* {
          pathway.links
            ? (
              <>
                <h3 className="pathway__content--title title is-3">
                  Resources
                </h3>
                <p className="pathway__content--description">
                    {pathway.links.split(',').map((link, i) => <React.Fragment key={i}><a href={link} target="_blank" rel="noopener noreferrer" className="pathway__content--description--link">{link}</a><br/></React.Fragment>)}
                </p>
              </>
            )
            : null
        } */}

        {/* {
          currentUser.role === 'user'
            ? (
              <div className="pathway__content--btns-container">
                <button className="pathway__content--btn button is-info" onClick={() => favoritePathway(pathway.id, currentUser.user_id)}>Set as active pathway</button>
                <button className="pathway__content--btn button is-dark" onClick={() => handleAddFavorite(pathway.id, currentUser.user_id)}>Add to favorite pathways</button>
              </div>
            ) : null
        } */}

      </section>
    </main>
  );
};

export default OpportunityPage;
