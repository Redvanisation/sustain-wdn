import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UsersProvider from '../providers/UsersProvider';
import Homepage from '../pages/Homepage';
import Login from '../components/Login';
import UserSignup from '../components/UserSignup';
import OrganizationSignup from '../components/OrganizationSignup';
import FacilitatorSingup from '../components/FacilitatorSingup';
import Navigation from '../components/Navigation';
import YouthPage from '../pages/YouthPage';
import FacilitatorPage from '../pages/FacilitatorPage';
import OrganizationPage from '../pages/OrganizationPage';
import ErrorComponent from '../components/ErrorComponent';
import PathwaysSurvey from '../components/PathwaysSurvey';
import DreamMapEdit from '../components/DeamMapEdit';
import YouthPageEdit from '../components/YouthPageEdit';
import FacilitatorPageEdit from '../components/FacilitatorPageEdit';
import OrganizationPageEdit from '../components/OrganizationPageEdit';
import UserPathwaysPage from '../pages/UserPathwaysPage';
import PathwayPage from '../pages/PathwayPage';
import AddOpportunity from '../components/AddOpportunity';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UsersProvider>
          <Navigation />
          <Route exact path='/' component={Homepage} />
          <Route exact path='/auth' component={Login} />
          <Route exact path='/register/user' component={UserSignup} />
          <Route exact path='/user/:id' component={YouthPage} />
          <Route exact path='/facilitator/:id' component={FacilitatorPage} />
          <Route exact path='/organization/:id' component={OrganizationPage} />
          <Route exact path='/error' component={ErrorComponent} />
          <Route exact path='/youth/survey' component={PathwaysSurvey} />
          <Route exact path='/dreammap/edit' component={DreamMapEdit} />
          <Route exact path='/edit/user' component={YouthPageEdit} />
          <Route exact path='/edit/facilitator' component={FacilitatorPageEdit} />
          <Route exact path='/edit/organization' component={OrganizationPageEdit} />
          <Route exact path='/register/organization' component={OrganizationSignup} />
          <Route exact path='/register/facilitator' component={FacilitatorSingup} />
          <Route exact path='/add/opportunity' component={AddOpportunity} />
          
          <Route exact path='/pathways' component={UserPathwaysPage} />
          <Route exact path='/pathway/:id' component={PathwayPage} />
        </UsersProvider>
      </Switch>
    </BrowserRouter>
  )
};

export default App;
