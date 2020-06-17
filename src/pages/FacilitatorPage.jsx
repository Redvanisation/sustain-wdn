import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../helpers/';
import UserRecord from '../components/UserRecord';
// import { UserContext } from '../providers/UsersProvider';

const FacilitatorPage = () => {
  const [facilitator, setFacilitator] = useState({});
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showUsers, setShowUsers] = useState(false);

  // const userCtx = useContext(UserContext);
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};


  useLayoutEffect(() => {
    if (!(currentUser.role === 'facilitator')) {
      history.push('/auth');
    }
  });

  useEffect(() => {
    if (currentUser) {
      const getFacilitator = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}api/v1/facilitators/${currentUser.user_id}`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        });

        setFacilitator(response.data);
      }

      getFacilitator();
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const getUsers = async () => {
        const response = await axios({
          method: 'get',
          url: `${baseUrl}api/v1/facilitator_users`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`
          }
        });

        setUsers(response.data);
        setIsLoading(false);
      }

      getUsers();
    }
  }, []);


  return (
    <main className="facilitator">
      {/* {console.log(facilitator)} */}
      {/* {console.log(users)} */}
      
      {
      isLoading
        ? (
          'boo'
        )
        : (
          <>
            <header className="facilitator__header title is-3 is-bold">
              <h3 className="facilitator__header--title">Welcome back facilitator <span className="facilitator__header--username">{facilitator.name}</span>!</h3>
            </header>
      
            <section className="facilitator__profile-section">
      
              <div className="facilitator__profile-section--image-div">
                <h3 className="facilitator__profile-section--title">{facilitator.name}</h3>
                <div className="facilitator__profile-section--image" style={{'content':`url(${facilitator.image ? facilitator.image.url : null})`}} />
                <Link to="/edit/facilitator" className="facilitator__profile-section--edit-btn">Edit my profile</Link>
                <button className="facilitator__profile-section--edit-btn-button" onClick={() => setShowUsers(!showUsers)}>View my users</button>
              </div>
      
            
              <div className={showUsers ? "facilitator__profile-section--users-container" : "facilitator__profile-section--users-container hidden"}>
                <h3 className="facilitator__profile-section--title title is-3">Users</h3>
                {users.map(user => <UserRecord 
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    activePathway={user.active_pathway}
                    user={user}
                  />)}
              </div>
      

            </section>
          </>
        )
      }

    </main>
  );
};

export default FacilitatorPage;
