import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UsersProvider from '../providers/UsersProvider';
import Homepage from '../pages/Homepage';
import Login from '../components/Login';
import UserSignup from '../components/UserSignup';
import FacilitatorSingup from '../components/FacilitatorSingup';
import Navigation from '../components/Navigation';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UsersProvider>
          <Navigation />
          <Route exact path='/' component={Homepage} />
          <Route exact path='/auth' component={Login} />
          <Route exact path='/register/user' component={UserSignup} />
          <Route exact path='/register/facilitator' component={FacilitatorSingup} />
        </UsersProvider>
      </Switch>
    </BrowserRouter>
  )
};

export default App;
