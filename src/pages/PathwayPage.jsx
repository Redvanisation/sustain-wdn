import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../helpers/';

const PathwayPage = (props) => {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  const pathway = JSON.parse(localStorage.getItem('pathway')) || {};

  useLayoutEffect(() => {
    if (pathway.length < 1) {
      if (currentUser && currentUser.role === 'user') {
        history.push(`/user/${currentUser.user_id}`);
      } else if (currentUser && currentUser.role === 'facilitator') {
        history.push(`/facilitator/${currentUser.user_id}`);
      } else {
        history.push('/');
      }
    };
  });

  // const handleAddFavorite = () => {
  //   /api/v1/user_pathways/:id


  // }
  
  
  // const pathway = props.location.pathway;


  // console.log(pathway)
  return (
    <main className="pathway">
      <header className="pathway__header">
        <h2 className="pathway__header--title title is-2">
          {pathway.title}
        </h2>
      </header>

      <section className="pathway__content">
        <h3 className="pathway__content--title title is-3">
          About {pathway.title} Pathway
        </h3>
        <p className="pathway__content--description">
          {pathway.description}
        </p>

        <h3 className="pathway__content--title title is-3">
          Responsibilities
        </h3>
        <div className="pathway__content--description content">
          {
            pathway.responsibilities.split(',').map((entry, i) => <ul key={i}><li>{entry}</li></ul>)
          }
        </div>

        <h3 className="pathway__content--title title is-3">
          Qualifications
        </h3>
        <div className="pathway__content--description content">
          {
            pathway.qualifications.split(',').map((entry, i)=> <ul key={i}><li>{entry}</li></ul>)
          }
        </div>

        <h3 className="pathway__content--title title is-3">
          Salary
        </h3>
        <p className="pathway__content--description pathway__content--description--salary is-bold">
          {pathway.salary}
        </p>

        {
          pathway.links
            ? (
              <>
                <h3 className="pathway__content--title title is-3">
                  Resources
                </h3>
                <p className="pathway__content--description">
                    {pathway.links.split(',').map((link, i) => <><a key={i} href={link} target="_blank" rel="noopener noreferrer">{link}</a><br/></>)}
                </p>
              </>
            )
            : null
        }

        <div className="pathway__content--btns-container">
          <button className="pathway__content--btn button is-info">Set as active pathway</button>
          <button className="pathway__content--btn button is-dark" >Add to favorite pathways</button>
        </div>

      </section>
    </main>
  );
};

export default PathwayPage;
