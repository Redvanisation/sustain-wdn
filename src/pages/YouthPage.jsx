import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../providers/UsersProvider';
import { baseUrl } from '../helpers/';

const YouthPage = () => {
  const [user, setUser] = useState({});
  const [facilitator, setFacilitator] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const userCtx = useContext(UserContext);
  const history = useHistory();

  // useLayoutEffect(() => {
  //   if (!userCtx.cookies.user) {
  //     history.push('/auth');
  //   }
  // });

  useEffect(() => {
    if (userCtx.cookies.user) {
      const getUser = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}api/v1/users/${userCtx.cookies.user.user_id}`,
          headers: {
            "Authorization": `Bearer ${userCtx.cookies.token}`
          }
        });

        setUser(response.data);
        setIsLoading(false);
      }

      getUser();
    }
  }, [userCtx.cookies.user, userCtx.cookies.token]);

  return (
    <main className="youth">
      {
        isLoading 
          ? <h2>Getting user...</h2>
          : (
            <>
              <header className="youth__header title is-3 is-bold">
                <h3 className="youth__header--title">Welcome back, {user.name}!</h3>
              </header>
              <section className="youth__profile-section">
                
                <div className="youth__profile-section--image-div">
                  <h3 className="youth__profile-section--title">{user.name}</h3>
                  <img src="#" alt="profile" className="youth__profile-section--image" />
                  <h3 className="youth__profile-section--title">Facilitator</h3>
                  <img src="#" alt="profile" className="youth__profile-section--image-facilitator" />
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
                <h2 className="youth__dream-map--title title is-3">Dream Map</h2>

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
            </>
          )
      }
    </main>
  );
};

export default YouthPage;
