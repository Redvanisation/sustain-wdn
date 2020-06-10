import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../components/Login';
import UserSignup from '../components/UserSignup';
import FacilitatorSingup from '../components/FacilitatorSingup';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/auth' component={Login} />
        <Route exact path='/register/user' component={UserSignup} />
        <Route exact path='/register/facilitator' component={FacilitatorSingup} />
      </Switch>
    </BrowserRouter>
  )
};

export default App;
