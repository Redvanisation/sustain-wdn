import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar } from 'react-bulma-components';
import { UserContext } from '../providers/UsersProvider';
import logo from '../assets/logo-small.png';

const Navigation = () => {
  const userCtx = useContext(UserContext);
  const [showHide, setShowHide] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    // if (userCtx.cookies.token && userCtx.cookies.user) {
      userCtx.removeCookie('token');
      userCtx.removeCookie('user');
      console.log('Logged out');
    // }
    
  };

  const renderTabs = () => {
    if (userCtx.cookies.user && userCtx.cookies.user.role === 'user') {
      return (
        <Link to={`/user/${userCtx.cookies.user.user_id}`} className="navigation__item">
          Youth
        </Link>
      );
    } else if (userCtx.cookies.user && userCtx.cookies.user.role === 'facilitator') {
      return (
        <Link to={`/facilitator/${userCtx.cookies.user.user_id}`} className="navigation__item">
          Facilitator
        </Link>
      );
    } else if (userCtx.cookies.user && userCtx.cookies.user.role === 'organization') {
      return (
        <Link to={`/organization/${userCtx.cookies.user.user_id}`} className="navigation__item">
          Organization
        </Link>
      );
    } else {
      return (
        <>
        <Link to="/auth" className="navigation__item">
          Youth
        </Link>

        <Link to="/auth" className="navigation__item">
          Facilitator
        </Link>

        <Link to="/auth" className="navigation__item">
          Organization
        </Link>
        </>
      );
    }
  };

  const boo = false

  return (
    <>
      <Navbar
        // fixed="top"
        active={showHide}
        transparent={false}
        className="navigation"
      >
          {
            !boo
              ? (
              <div className="navigation__top-div">
                  <h1 className="navigation__top-div--title">
                    <span className="title is-3 navigation__top-div--title-part-1">Sustainable Workforce Development Network</span>
                    <span className="subtitle is-4 navigation__top-div--title-part-2">Resources To Build A Sustainable World</span>
                  </h1>

                  <Navbar.Brand>
                    <a href="/" className="navigation__logo-div">
                      <img src={logo} alt="SustainWDN logo" className="navigation__logo-div--logo" />
                    </a>
                  </Navbar.Brand>
              </div>
              )
              : (
                null
              )
          }
          {
            !boo
              ? (
                <Navbar.Burger onClick={() => setShowHide(!showHide)} position="start" />
              )
              : (
                <Navbar.Brand>
                  <a href="/" className="navigation__logo-div-logged">
                    <img src={logo} alt="SustainWDN logo" className="navigation__logo-div--logo" />
                  </a>
                  <Navbar.Burger onClick={() => setShowHide(!showHide)} position="start" />
                </Navbar.Brand>
              )
          }
        {/* <span className="burger-text">Menu</span> */}


        <Navbar.Menu>
          <Navbar.Container className="navigation__menu-container">
            <Link to="/" className="navigation__item">
              Home
            </Link>

            <Link to="#" className="navigation__item">
              About us
            </Link>

            {
              renderTabs()
            }

            {
              userCtx.cookies.user
                ? (
                  <Link to="/" className="navigation__item" onClick={handleLogout}>
                    Log out
                  </Link>
                )
                : (
                  <>
                    <Link to="/register/user" className="navigation__item">
                      Register
                    </Link>

                    <Link to="/auth" className="navigation__item">
                      Log in
                    </Link>
                  </>
                )
            }
          </Navbar.Container>

        </Navbar.Menu>
      </Navbar>
    </>
  );
}

export default Navigation;
