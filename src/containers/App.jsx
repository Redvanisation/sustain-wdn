import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UsersProvider from '../providers/UsersProvider';
import Homepage from '../pages/Homepage';
import Login from '../components/Login';
import UserSignup from '../components/UserSignup';
import FacilitatorSingup from '../components/FacilitatorSingup';
import Navigation from '../components/Navigation';
import YouthPage from '../pages/YouthPage';
import FacilitatorPage from '../pages/FacilitatorPage';
import OrganizationPage from '../pages/OrganizationPage';
import ErrorComponent from '../components/ErrorComponent';
import PathwaysSurvey from '../components/PathwaysSurvey';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UsersProvider>
          <Navigation location='boo' />
          <Route exact path='/' component={Homepage} />
          <Route exact path='/auth' component={Login} />
          <Route exact path='/register/user' component={UserSignup} />
          <Route exact path='/user/:id' component={YouthPage} />
          <Route exact path='/facilitator/:id' component={FacilitatorPage} />
          <Route exact path='/organization/:id' component={OrganizationPage} />
          <Route exact path='/error' component={ErrorComponent} />
          <Route exact path='/pathways' component={PathwaysSurvey} />
          {/* <Route exact path='/register/facilitator' component={FacilitatorSingup} /> */}
        </UsersProvider>
      </Switch>
    </BrowserRouter>
  )
};

export default App;
