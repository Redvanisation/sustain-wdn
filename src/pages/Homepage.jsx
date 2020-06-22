import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { FaRegUser, FaRegThumbsUp, FaRegBuilding } from "react-icons/fa";


const Homepage = () => {

  const currentUser = JSON.parse(localStorage.getItem('user'));

  

  const verifyUser = (type) => {
    if (currentUser && currentUser.role === type) {
      const id = currentUser.user_id;
      return `/${type}/${id}`;
    } else if (currentUser && currentUser.role !== type) {
      return '/error';
    } else {
      return '/auth';
    }
  };



  return (
    <>
      <main className="homepage">
        <section className="homepage__top-section">
          <h1 className="homepage__title title is-2">Welcome To SustainWDN</h1>
          
          <p className="homepage__top-section--text">SustainWDN is the go-to sustainability careers website for youth, teachers/facilitators and community businesses/organizations. Our easy-to-use tools and simple process makes it easy for youth to discover and land their dream blue/green jobs with the help of a facilitator. Step one: Community businesses and organizations post their blue-green job opportunities.</p>

          <p className="homepage__top-section--text">Step two: Facilitators guide youth to take a short survey indicating their experience, talents and interests. Step three: We create a customized SustainWDN career pathway for each youth, along with many other interactive tools, such as the Dream Map, where the youth can graphically plan their goals. Voila! Together, we build a more sustainable economy and environment!</p>
        </section>

        <section className="homepage__bottom-section">
          <h3 className="homepage__secondary-title subtitle is-3">
            I am a ...
          </h3>

          <div className="homepage__bottom-section--cards-div columns">
            
          <div className="column is-one-quarter is-centered">
              <div className="card">
                <Link to={verifyUser('user')}>
                <div className="card-image">
                    <FaRegUser className="card-icon" />
                  </div>
                  <div className="card-content">
                    <div className="media">

                      <div className="media-content has-text-centered">
                        <p className="title is-5">Youth</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="column is-one-quarter is-centered">
              <div className="card">
                <Link to={verifyUser('facilitator')}>
                  <div className="card-image">
                    <FaRegThumbsUp className="card-icon" />
                  </div>
                  <div className="card-content">
                    <div className="media">

                      <div className="media-content has-text-centered">
                        <p className="title is-5">Facilitator</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="column is-one-quarter is-centered">
              <div className="card">
                <Link to={verifyUser('organization')}>
                  <div className="card-image">
                    <FaRegBuilding className="card-icon" />
                  </div>
                  <div className="card-content">
                    <div className="media">

                      <div className="media-content has-text-centered">
                        <p className="title is-5">Organization</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Homepage;
