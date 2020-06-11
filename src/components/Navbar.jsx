import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../providers/UsersProvider';
import { baseUrl } from '../helpers/';

const Navbar = () => {
  const userCtx = useContext(UserContext);
  // const history = useHistory();

  const handleLogout = () => {
    if (userCtx.cookies.user) {
      axios({
        method: 'delete',
        url: `${baseUrl}auth/logout`,
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            userCtx.removeCookie('user');
            // history.push('/auth');
            console.log('Logged out');
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('login first');
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            Home
          </a>

          <a className="navbar-item">
            Documentation
          </a>

        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                userCtx.cookies.user
                  ? (
                    <Link to="#" className="button is-light" onClick={handleLogout}>
                      Logout
                    </Link>
                  )
                  : (
                    <>
                      <Link to="/register/user" className="button is-primary">
                      <strong>Register</strong>
                      </Link>
                      <Link to="/auth" className="button is-light">
                        Log in
                      </Link>
                    </>
                  )
              }

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
