import React, { useState } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { AuthContext } from "./context/auth";
// import PrivateRoute from './PrivateRoute';

import HomePage from './pages/Home';
import ProfileEng from './pages/ProfileEng';
import ProfileEngAdd from './pages/ProfileEngAdd';
import ProfileEngEdit from './pages/ProfileEngEdit';
import ProfileComp from './pages/ProfileComp';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup'
import Engineer from './pages/Engineer'
import Hire from './pages/Hire'
import Front from './pages/Front'
import Logout from './components/Logout';
import ProfileCompAdd from './pages/ProfileCompAdd';

function App(props) {

  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    console.log(data)
    localStorage.setItem("x-access-token", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <Route exact path="/engineer/profile" component={ProfileEng} />
          <Route path="/engineer/profile/add" component={ProfileEngAdd} />
          <Route path="/engineer/profile/edit" component={ProfileEngEdit} />
          <Route exact path="/company/profile" component={ProfileComp} />
          <Route path="/company/profile/add" component={ProfileCompAdd} />
          <Route path="/detail/:idEngineer" component={Engineer} />
          <Route path="/hire/:idEngineer" component={Hire} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/front" component={Front} />
          <Route exact path="/" component={HomePage} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}


export default App
