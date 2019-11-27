import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Home';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Engineer from './pages/Engineer'
import Hire from './pages/Hire'
import Front from './pages/Front'

class App extends Component {
  render() {
    
    if (window.location.pathname == "/signup" || window.location.pathname == "/front" || window.location.pathname == "/login") {
      console.log('login')
      return (
          <Router>
            <Route path="/front" component={Front} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
           
          </Router>
       )
   } else {
    console.log('Tidak login')
  
       return (
         
         <Router>
            
            <Header/>
            
            <div className="content">
              <Route exact path="/" component={HomePage} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/profile/edit" component={ProfileEdit} />
              <Route path="/engineer/:idEngineer" component={Engineer} />
              <Route path="/hire" component={Hire} />
            </div>
          </Router>
         
       )
   }
{/* return (
     
    <Router>      
    <div>
    <Header />
    <div className="content">
    <Route exact path="/" component={Profile} />
    <Route path="/profile" component={Profile} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/engineer/:idEngineer" component={Engineer} />
    <Route path="/hire" component={Hire} />
    </div>
    </div>
    </Router>
    ); */}
  }
 }

export default App
