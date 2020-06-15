import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../providers/UsersProvider';
import { baseUrl } from '../helpers/';

const YouthPage = () => {
  const [user, setUser] = useState({});
  const [facilitator, setFacilitator] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userCtx = useContext(UserContext);
  const history = useHistory();

  useLayoutEffect(() => {
    if (!currentUser) {
      history.push('/auth');
    }
  });


  useEffect(() => {
    if (currentUser) {
      const getUser = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}api/v1/users/${currentUser.user_id}`,
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
          url: `${baseUrl}api/v1/facilitators/${currentUser.facilitator_id}`,
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
            {console.log(facilitator)}
              <header className="youth__header title is-3 is-bold">
                <h3 className="youth__header--title">Welcome back, <span className="youth__header--username">{user.name}</span>!</h3>
              </header>
              <section className="youth__profile-section">
                
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, ex expedita quidem fugiat explicabo animi doloremque, asperiores sit corrupti molestias dignissimos laborum repellendus. Cumque aspernatur hic amet, incidunt alias enim.
                    </p>
                  </div>

                  <div className="youth__profile-section--bottom-container">

                    <div className="youth__profile-section--bottom-div">
                      <h3 className="youth__profile-section--title">Greatest Assets</h3>
                      <p className="youth__profile-section--bio-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, ex expedita quidem fugiat explicabo animi doloremque, asperiores sit corrupti molestias dignissimos laborum repellendus. Cumque aspernatur hic amet, incidunt alias enim.
                      </p>
                    </div>

                    <div className="youth__profile-section--bottom-div">
                      <h3 className="youth__profile-section--title">Greatest Challenges</h3>
                      <p className="youth__profile-section--bio-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, ex expedita quidem fugiat explicabo animi doloremque, asperiores sit corrupti molestias dignissimos laborum repellendus. Cumque aspernatur hic amet, incidunt alias enim.
                      </p>
                    </div>
                  </div>

                </div>
              </section>
              
              <section className="youth__dream-map">
                <h2 className="youth__titles title is-3">Dream Map</h2>

                <div className="youth__dream-map__container">
                  <div className="youth__dream-map__container--dreams-div">
                    <div className="youth__dream-map__container--dreams-dream">Dream one</div>
                    <div className="youth__dream-map__container--dreams-dream">Dream Two</div>
                    <div className="youth__dream-map__container--dreams-dream">Dream Three</div>
                  </div>

                  <div className="youth__dream-map__container--image-div">
                    <img src="#" alt="Dream map" className="youth__dream-map__container--image" />
                  </div>
                </div>
              </section>

              <section className="youth__worksheets">
                <h2 className="youth__titles title is-3">Worksheets</h2>

                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title">
                    Youth Bio Questions
                  </h3>
                  <Link>Link</Link>
                </div>
                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title">Professtional Development</h3>
                  <Link>Link</Link>
                </div>
                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title">Sustainability in Action</h3>
                  <Link>Link</Link>
                </div>
                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title">College Prep</h3>
                  <Link>Link</Link>
                </div>
                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title">5 years plan</h3>
                  <Link>Link</Link>
                </div>
              </section>

              <section className="youth__sustainability">
                <h2 className="youth__titles title is-3">Sustainability</h2>

                <h3 className="youth__sustainability--title title is-4">SustainWDN Pathways Survey</h3>
                <p className="youth__sustainability--text">
                  When you sign up we use the information that you give us (interests, skills, etc.) to recommend potential career areas. When you select a career area to explore, we offer you a graphical pathway to achieve a job in that area, with actionable items, such as internships we can help you to apply for. You can even apply for the job if you are already qualified!
                </p>
                <Link to="/pathways" className="youth__sustainability--link">
                  Take the Survey!
                </Link>
              </section>
            </>
          )
      }
    </main>
  );
};

export default YouthPage;
