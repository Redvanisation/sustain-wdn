import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/UsersProvider';
import ErrorComponent from '../components/ErrorComponent';


const Homepage = () => {

  const userCtx = useContext(UserContext);
  
  // const id = userCtx.cookies.user.id;

  const verifyUser = (type) => {
    if (userCtx.cookies.user && userCtx.cookies.user.role === type) {
      const id = userCtx.cookies.user.user_id;
      return `/${type}/${id}`;
    } else if (userCtx.cookies.user && userCtx.cookies.user.role !== type) {
      return '/error';
    } else {
      return '/auth';
    }
  };


  // console.log(userCtx.cookies.user)

  return (
    <main className="homepage">
      <section className="homepage__top-section">
        <h1 className="homepage__title title is-1">Welcome To SustainWDN</h1>
        
        <p className="homepage__top-section--text">SustainWDN is the go-to sustainability careers website for youth, teachers/facilitators and community businesses/organizations. Our easy-to-use tools and simple process makes it easy for youth to discover and land their dream blue/green jobs with the help of a facilitator. Step one: Community businesses and organizations post their blue-green job opportunities.</p>

        <p className="homepage__top-section--text">Step two: Facilitators guide youth to take a short survey indicating their experience, talents and interests. Step three: We create a customized SustainWDN career pathway for each youth, along with many other interactive tools, such as the Dream Map, where the youth can graphically plan their goals. Voila! Together, we build a more sustainable economy and environment!</p>
      </section>

      <section className="homepage__bottom-section">
        <h3 className="homepage__secondary-title">
          I am a ...
        </h3>

        <div className="homepage__bottom-section--cards-div columns">
          
        <div className="column is-one-fifth">
            <div className="card">
              <Link to={verifyUser('user')}>
                {/* <div className="card-image">
                  <figure className="image">
                    <img src="#" alt="Card-image" />
                  </figure>
                </div> */}
                <div className="card-content">
                  <div className="media">

                    <div className="media-content has-text-centered">
                      <p className="title is-5">Youth</p>
                      {/* <p className="subtitle is-6 is-bold">{formatPrice(product.price)}</p> */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="column is-one-fifth">
            <div className="card">
              <Link to={verifyUser('facilitator')}>
                {/* <div className="card-image">
                  <figure className="image">
                    <img src="#" alt="Card-image" />
                  </figure>
                </div> */}
                <div className="card-content">
                  <div className="media">

                    <div className="media-content has-text-centered">
                      <p className="title is-5">Facilitator</p>
                      {/* <p className="subtitle is-6 is-bold">{formatPrice(product.price)}</p> */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="column is-one-fifth">
            <div className="card">
              <Link to={verifyUser('organization')}>
                {/* <div className="card-image">
                  <figure className="image">
                    <img src="#" alt="Card-image" />
                  </figure>
                </div> */}
                <div className="card-content">
                  <div className="media">

                    <div className="media-content has-text-centered">
                      <p className="title is-5">Business/Organization</p>
                      {/* <p className="subtitle is-6 is-bold">{formatPrice(product.price)}</p> */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}

export default Homepage;
