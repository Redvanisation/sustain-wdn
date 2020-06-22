/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { baseUrl, setBackgroundImg } from '../helpers/';

const PathwayPage = (props) => {
  const history = useHistory();

  const pathways = JSON.parse(localStorage.getItem('the-pathways'));
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  const [pathway, setPathway] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const id = props.match.params.id;

  // const pathway = JSON.parse(localStorage.getItem('pathway')) ;

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

  useEffect(() => {
    if (currentUser && currentUser.role === 'user') {
      const getUserPathways = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}api/v1/user_pathways`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        });

        localStorage.setItem('user-fav-pathways', JSON.stringify(response.data));
      }

      getUserPathways();
    }
  }, []);

  useEffect(() => {

    const thePathw = pathways.find(path => path.id === parseInt(id));
    setPathway(thePathw);
    setIsLoading(false);
  }, [])

  
  const favoritePathway = (id, user_id) => {
    if (currentUser.role === 'user') {
      const data = new FormData();
      data.append('id', id);
      data.append('user_id', user_id);
  
      axios({
        method: 'post',
        url: `${baseUrl}/api/v1/user_pathways`,
        data,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            alert(`${res.data.active_pathway} set as active pathway`);
            // console.log(res.data)
          }
        })
        .catch(() => alert('Error setting the active pathway!'));

        axios({
          method: 'put',
          url: `${baseUrl}/api/v1/user_pathways/${id}`,
          data,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        })
          .then((res) => {
            localStorage.setItem('user-fav-pathways', JSON.stringify(res.data));
            console.log('Added successfully');
          })
          .catch(err => console.log(err));
    } else {
      alert('Only a user can set their own active pathway');
    }
  }

  const handleAddFavorite = (id, user_id) => {
    if (currentUser.role === 'user') {
      const data = new FormData();
      data.append('id', id);
      data.append('user_id', user_id);

      axios({
        method: 'put',
        url: `${baseUrl}/api/v1/user_pathways/${id}`,
        data,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then((res) => {
          alert('Pathway added to favorites successfully!');
          console.log(res.data)
        })
        .catch(() => alert('Pathway already in favorites'));
    } else {
      alert('Only a user can set their favorite pathways!');
    }
  }


  return (
    <main className="pathway">
      {
        !isLoading
          ? (
              <>
                <header className="pathway__header" style={{backgroundImage: `radial-gradient(rgba(32, 154, 206,.9) 50%, rgba(32, 154, 206, .5)), url(${setBackgroundImg(pathway.title)})`}}>
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
                              {pathway.links.split(',').map((link, i) => <React.Fragment key={i}><a href={link} target="_blank" rel="noopener noreferrer" className="pathway__content--description--link">{link}</a><br/></React.Fragment>)}
                          </p>
                        </>
                      )
                      : null
                  }

                  {
                    currentUser.role === 'user'
                      ? (
                        <div className="pathway__content--btns-container">
                          <button className="pathway__content--btn button is-info" onClick={() => favoritePathway(pathway.id, currentUser.user_id)}>Set as active pathway</button>
                          <button className="pathway__content--btn button is-dark" onClick={() => handleAddFavorite(pathway.id, currentUser.user_id)}>Add to favorite pathways</button>
                        </div>
                      ) : null
                  }

                </section>
              </>
          ) : 'LOADING...'
      }
    </main>
  );
};

export default PathwayPage;
