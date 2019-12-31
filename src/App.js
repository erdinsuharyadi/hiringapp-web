import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {ProtectedRoute} from './context/ProtectedRoute'

import HomePage from './pages/Home/Home';
import ProfileEng from './pages/Engineer/ProfileEng';
import ProfileEngAdd from './pages/ProfileEngAdd';
import ProfileEngEdit from './pages/Engineer/ProfileEngEdit';
import ProfileComp from './pages/Company/ProfileComp';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup'
import Engineer from './pages/Engineer/Engineer'
import Hire from './pages/Hire/Hire'
import Front from './pages/Front/Front'
import Offer from './pages/Offer/Offer'
import OfferDetail from './pages/Offer/OfferDetail'
import ProfileCompEdit from './pages/Company/ProfileCompEdit';
import Project from './pages/Project/Project';
import ProjectAdd from './pages/Project/ProjectAdd';
import ProjectDetail from './pages/Project/ProjectDetail';
import ProjectEdit from './pages/Project/ProjectEdit';


import store from "./redux/store"
import { Provider } from "react-redux";


function App(props) {

  
  return (
  
      <Router>
        <div>
          <Route exact path="/" component={Front} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />    
          <ProtectedRoute path="/home" component={HomePage} />
          <ProtectedRoute exact path="/engineer/profile/:username" component={ProfileEng} />
          <ProtectedRoute path="/engineer/profile/add" component={ProfileEngAdd} />
          <ProtectedRoute path="/engineer/edit" component={ProfileEngEdit} />
          <ProtectedRoute exact path="/company/profile/:username" component={ProfileComp} />
          <ProtectedRoute path="/company/edit" component={ProfileCompEdit} />
          <ProtectedRoute exact path="/company/project/" component={Project} />
          <ProtectedRoute path="/company/project/add" component={ProjectAdd} />
          <ProtectedRoute path="/company/project/edit/:idProj" component={ProjectEdit} />
          <ProtectedRoute path="/company/project/view/:idProj" component={ProjectDetail} />
          <ProtectedRoute path="/detail/:idEngineer" component={Engineer} />
          <ProtectedRoute path="/hire/:idEngineer" component={Hire} />
          <ProtectedRoute exact path="/offer" component={Offer} />
          <ProtectedRoute path="/offer/view/" component={OfferDetail} />
        </div>
      </Router>
  
  );
}


export default App
