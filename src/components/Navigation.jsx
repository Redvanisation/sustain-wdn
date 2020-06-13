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
      history.push('/');
      userCtx.removeCookie('user');
      userCtx.removeCookie('token');
      console.log('Logged out');
    // }
    
  };

  const renderTabs = () => {
    if (userCtx.cookies.user && userCtx.cookies.user.role === 'user') {
      return (
        <Navbar.Item href={`/user/${userCtx.cookies.user.user_id}`} className="navigation__item">
          Youth
        </Navbar.Item>
      );
    } else if (userCtx.cookies.user && userCtx.cookies.user.role === 'facilitator') {
      return (
        <Navbar.Item href={`/facilitator/${userCtx.cookies.user.user_id}`} className="navigation__item">
          Facilitator
        </Navbar.Item>
      );
    } else if (userCtx.cookies.user && userCtx.cookies.user.role === 'organization') {
      return (
        <Navbar.Item href={`/organization/${userCtx.cookies.user.user_id}`} className="navigation__item">
          Organization
        </Navbar.Item>
      );
    } else {
      return (
        <>
        <Navbar.Item href="/auth" className="navigation__item">
          Youth
        </Navbar.Item>

        <Navbar.Item href="/auth" className="navigation__item">
          Facilitator
        </Navbar.Item>

        <Navbar.Item href="/auth" className="navigation__item">
          Organization
        </Navbar.Item>
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
            <Navbar.Item href="/" className="navigation__item">
              Home
            </Navbar.Item>

            <Navbar.Item href="#" className="navigation__item">
              About us
            </Navbar.Item>

            {
              renderTabs()
            }

            {
              userCtx.cookies.user
                ? (
                  <Navbar.Item className="navigation__item" onClick={handleLogout}>
                    Log out
                  </Navbar.Item>
                )
                : (
                  <>
                    <Navbar.Item href="/register/user" className="navigation__item">
                      Register
                    </Navbar.Item>

                    <Navbar.Item href="/auth" className="navigation__item">
                      Log in
                    </Navbar.Item>
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
