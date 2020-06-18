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

  const [allUsers, setAllUsers] = useState([]);
  const [allFacilitators, setAllFacilitators] = useState([]);
  const [allOrganizations, setAllOrganizations] = useState([]);


  const [toShow, setToShow] = useState('');

  const [showContainer, setShowContainer] = useState(false);

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

  const fetchUsers = (users) => {
    setShowContainer(true);
    setToShow(users);

      axios({
        method: 'get',
        url: `${baseUrl}api/v1/${users}`,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then(res => setAllUsers(res.data))
        .catch(() => alert('Error getting the users list'));
  };


  const setShowItems = (state) => {
    switch(state) {
      case 'users':
        return (
          <>
            <h3 className="facilitator__profile-section--title title is-3">All Users</h3>
            {allUsers.map(user => <UserRecord 
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                activePathway={user.active_pathway}
                user={user}
                currentUser={currentUser}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
              />)}
          </>
        );
      
      case 'facilitators':
        return (
          <>
            <h3 className="facilitator__profile-section--title title is-3">All Facilitators</h3>
            {/* {allUsers.map(user => <UserRecord 
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                activePathway={user.active_pathway}
                user={user}
                currentUser={currentUser}
              />)} */}
              BUWAHAHAHAA
          </>
        );

      case 'organizations':
        return (
          <>
            <h3 className="facilitator__profile-section--title title is-3">All Organizations</h3>
            {/* {allUsers.map(user => <UserRecord 
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                activePathway={user.active_pathway}
                user={user}
                currentUser={currentUser}
              />)} */}
              BOOOOOO
          </>
        );

      default:
        return null;
    }
  }


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
              <h3 className="facilitator__header--title">Welcome back facilitator <span className="facilitator__header--username">{facilitator.name}</span>!</h3>
            </header>
      
            <section className="facilitator__profile-section">
      
              <div className="facilitator__profile-section--image-div">
                <h3 className="facilitator__profile-section--title subtitle is-5">{facilitator.name}</h3>
                <h3 className="facilitator__profile-section--title subtitle is-6">Facilitator Code: {facilitator.id}</h3>
                <div className="facilitator__profile-section--image" style={{'content':`url(${facilitator.image ? facilitator.image.url : null})`}} />
                <Link to="/edit/facilitator" className="facilitator__profile-section--edit-btn">Edit my profile</Link>
                {
                  facilitator && !facilitator.admin
                  ? (
                      <button className="facilitator__profile-section--edit-btn-button" onClick={() => setShowUsers(!showUsers)}>View my users</button>
                    ) 
                    : (
                      <>
                        {/* Admin section begins */}
                        <button className="facilitator__profile-section--edit-btn-button" onClick={() => fetchUsers('users')}>Users</button>
                        <button className="facilitator__profile-section--edit-btn-button" onClick={() => fetchUsers('facilitators')}>Facilitators</button>
                        <button className="facilitator__profile-section--edit-btn-button" onClick={() => fetchUsers('organizations')}>Organizations</button>
                        <h3 className="facilitator__profile-section--title subtitle is-5">
                          {facilitator.admin ? 'Admin' : null}
                        </h3>
                        {/* Admin section ends */}
                      </>
                    )
                }

              </div>
      
              {
                facilitator.admin
                  ? (
                    <>
                      <div className={showContainer ? "facilitator__profile-section--users-container" : "facilitator__profile-section--users-container hidden"}>
                        {
                          setShowItems(toShow)
                        }

                      </div>
                    </>
                  )
                  : (
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
                  )
              }

            </section>
          </>
        )
      }

    </main>
  );
};

export default FacilitatorPage;
