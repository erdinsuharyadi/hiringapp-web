import React, { useState } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { AuthContext } from "./context/auth";
// import PrivateRoute from './PrivateRoute';

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
import Logout from './components/Logout';
// import ProfileCompAdd from './pages/ProfileCompAdd';
import ProfileCompEdit from './pages/Company/ProfileCompEdit';
import Project from './pages/Project/Project';
import ProjectAdd from './pages/Project/ProjectAdd';
import ProjectDetail from './pages/Project/ProjectDetail';
import ProjectEdit from './pages/Project/ProjectEdit';
import Eng from './pages/Eng'
import store from "./redux/store"
import { Provider } from "react-redux";

function App(props) {

  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    console.log(data)
    localStorage.setItem("x-access-token", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
  <Provider store={store}>
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
        <Route path={"/eng"} component={Eng} />
          <Route exact path="/engineer/profile/:username" component={ProfileEng} />
          <Route path="/engineer/profile/add" component={ProfileEngAdd} />
          <Route path="/engineer/edit" component={ProfileEngEdit} />
          <Route exact path="/company/profile/:username" component={ProfileComp} />
          <Route path="/company/edit" component={ProfileCompEdit} />
          
          <Route exact path="/company/project/" component={Project} />
          <Route path="/company/project/add" component={ProjectAdd} />
          <Route path="/company/project/edit/:idProj" component={ProjectEdit} />
          <Route path="/company/project/view/:idProj" component={ProjectDetail} />
          <Route path="/detail/:idEngineer" component={Engineer} />
          <Route path="/hire/:idEngineer" component={Hire} />
          <Route exact path="/offer" component={Offer} />
          <Route path="/offer/view/" component={OfferDetail} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={HomePage} />
          <Route exact path="/" component={Front} />
        </div>
      </Router>
    </AuthContext.Provider>
  </Provider>  
  );
}


export default App
