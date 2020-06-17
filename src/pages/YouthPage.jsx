import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
// import { UserContext } from '../providers/UsersProvider';
import { baseUrl } from '../helpers/';
import blueStar from '../assets/star-blue.png';
import greenStar from '../assets/star-green.png';
import orangeStar from '../assets/star-orange.png';

const YouthPage = (props) => {
  const [user, setUser] = useState({});
  const [facilitator, setFacilitator] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  // const userCtx = useContext(UserContext);
  const history = useHistory();

  useLayoutEffect(() => {
    if (!(currentUser.role === 'user') && !(currentUser.role === 'facilitator')) {
      history.push('/auth');
    }
  });

  const getId = () => {
    if (currentUser.role === 'user') {
      return currentUser.user_id;
    } else {
      return props.match.params.id;
    }
  }

  const getFacilitatorId = () => {
    if (currentUser.role === 'user') {
      return currentUser.facilitator_id;
    } else {
      return currentUser.user_id;
    }
  }


  useEffect(() => {
    if (currentUser) { 
      const getUser = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}api/v1/users/${getId()}`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        });

        setUser(response.data);
        setIsLoading(false);
      }

      getUser();
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const getFacilitator = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}api/v1/facilitators/${getFacilitatorId()}`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        });

        setFacilitator(response.data);
      }

      getFacilitator();
    }
  }, [])

  return (
    <main className="youth">
      {
        isLoading 
          ? <h2>Getting user...</h2>
          : (
            <>
            {/* {console.log(user)} */}
              <header className="youth__header title is-3 is-bold">
                <h3 className="youth__header--title">Welcome back, <span className="youth__header--username">{user.name}</span>!</h3>
              </header>
              
              <section className="youth__profile-section">
                {
                  currentUser.role === 'user' || currentUser.role === 'facilitator'
                    ? (
                      <Link to={{
                        pathname: "/edit/user",
                        user
                      }} className="youth__profile-section--edit-btn">Edit</Link>
                    )
                    : null
                }

                <div className="youth__profile-section--image-div">
                  <h3 className="youth__profile-section--title">{user.name}</h3>
                  <div className="youth__profile-section--image" style={{'content':`url(${user.image ? user.image.url : null})`}} />
                  <h3 className="youth__profile-section--title">Facilitator</h3>
                  <span className="youth__header--username">{facilitator.name}</span>
                  <div className="youth__profile-section--image-facilitator" style={{'content':`url(${facilitator.image ? facilitator.image.url : null})`}} />
                </div>

                <div className="youth__profile-section--bio-div">
                  <div className="youth__profile-section--bio-container">
                    <h3 className="youth__profile-section--title">Bio</h3>
                    <p className="youth__profile-section--bio-text">
                      {user.bio ? user.bio : 'Edit your profile to set up your bio'}
                    </p>
                  </div>

                  <div className="youth__profile-section--bottom-container">

                    <div className="youth__profile-section--bottom-div">
                      <h3 className="youth__profile-section--title">Greatest Assets</h3>
                      <p className="youth__profile-section--bio-text">
                        {user.greatest_assets ? user.greatest_assets : 'Edit your profile to set up your greatest assets'}
                      </p>
                    </div>

                    <div className="youth__profile-section--bottom-div">
                      <h3 className="youth__profile-section--title">Greatest Challenges</h3>
                      <p className="youth__profile-section--bio-text">
                        {user.greatest_challenges ? user.greatest_challenges : 'Edit your profile to set up your greatest challenges'}
                      </p>
                    </div>
                  </div>

                </div>
              </section>
              
              <section className="youth__dream-map">
                <h2 className="youth__titles title is-3">Dream Map</h2>

                <div className="youth__dream-map__container">

                  <div className="youth__dream-map__container--image-div">
                    <figure className="youth__dream-map__container--figure">
                      <img src={blueStar} alt="Dream map" className="youth__dream-map__container--image" />
                      <figcaption className="youth__dream-map__container--image-text text-blue">
                        {user.life_dream ? user.life_dream : 'Set your life dream!'}
                      </figcaption>
                    </figure>

                    <figure className="youth__dream-map__container--figure">
                      <img src={orangeStar} alt="Dream map" className="youth__dream-map__container--image" />
                      <figcaption className="youth__dream-map__container--image-text text-orange">
                        {user.community_dream ? user.community_dream : 'Set your dream for the community!'}
                      </figcaption>
                    </figure>

                    <figure className="youth__dream-map__container--figure">
                      <img src={greenStar} alt="Dream map" className="youth__dream-map__container--image" />
                      <figcaption className="youth__dream-map__container--image-text text-green">
                        {user.world_dream ? user.world_dream : 'Set your dream for the world!'}
                      </figcaption>
                    </figure>
                  </div>

                </div>

                {
                  currentUser.role === 'user' || currentUser.role === 'facilitator'
                    ? (
                      <Link to={{
                        pathname: "/dreammap/edit",
                        user
                      }} className="youth__dream-map--button">
                        {
                          (user.life_dream || user.community_dream || user.world_dream)
                            ? 'Update my dreams'
                            : 'Set my dreams'
                        }
                      </Link>
                    )
                    : null
                }
              </section>

              <section className="youth__worksheets">
                <h2 className="youth__titles title is-3">Worksheets</h2>

                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title">
                    Youth Bio Questions
                  </h3>
                  <Link to="#">Link</Link>
                </div>
                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title">Professtional Development</h3>
                  <Link to="#">Link</Link>
                </div>
                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title">Sustainability in Action</h3>
                  <Link to="#">Link</Link>
                </div>
                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title">College Prep</h3>
                  <Link to="#">Link</Link>
                </div>
                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title">5 years plan</h3>
                  <Link to="#">Link</Link>
                </div>
              </section>

              <section className="youth__sustainability">
                <h2 className="youth__titles title is-3">Sustainability</h2>

                <h3 className="youth__sustainability--title title is-4">SustainWDN Pathways Survey</h3>
                <p className="youth__sustainability--text">
                  When you sign up we use the information that you give us (interests, skills, etc.) to recommend potential career areas. When you select a career area to explore, we offer you a graphical pathway to achieve a job in that area, with actionable items, such as internships we can help you to apply for. You can even apply for the job if you are already qualified!
                </p>
                {
                  currentUser.role === 'user'
                    ? (
                      <Link to="/youth/servey" className="youth__sustainability--link">
                        Take the Survey!
                      </Link>
                    ) : null
                }
              </section>
            </>
          )
      }
    </main>
  );
};

export default YouthPage;
