import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bulma-components';
import logo from '../assets/logo-small.png';
import { notify } from '../helpers/';

const Navigation = () => {
  const [showHide, setShowHide] = useState(false);
  const [topText, setTopText] = useState(true);
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (location.pathname === '/') {
      setTopText(true);
    } else {
      setTopText(false);
    }
  }, [location.pathname]);


  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    localStorage.clear();

    notify('Logged out!');
    
  };


  const renderTabs = () => {
    if (currentUser && currentUser.role === 'user') {
      return (
        <Link to={`/user/${currentUser.user_id}`} className="navigation__item">
          Youth
        </Link>
      );
    } else if (currentUser && currentUser.role === 'facilitator') {
      return (
        <Link to={`/facilitator/${currentUser.user_id}`} className="navigation__item">
          {
            currentUser.admin
              ? 'Admin'
              : 'Facilitator'
          }
        </Link>
      );
    } else if (currentUser && currentUser.role === 'organization') {
      return (
        <Link to={`/organization/${currentUser.user_id}`} className="navigation__item">
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

  const checkToken = () => {
    if (localStorage.getItem('auth')) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Navbar
        // fixed="top"
        active={showHide}
        transparent={false}
        className="navigation"
      >
          {
            !topText
              ? null
              : (
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
          }
          {
            topText
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

            <Link to="/about" className="navigation__item">
              About us
            </Link>

            {
              renderTabs()
            }

            {
              checkToken()
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
