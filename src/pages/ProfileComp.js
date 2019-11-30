import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Header from '../components/Header';
class ProfileCamp extends Component {
  render() {
    return (
      <div>
      <Header/>
      <main role="main">
        <div className="jumbotron border-round-0 min-50vh" style={{backgroundImage: 'url(https://timelinecovers.pro/facebook-cover/download/pimple-a-simple-php-dependency-injection-container-facebook-cover.jpg)', backgroundSize: '100%'}} >
        </div>
        <div className="container mb-4">
          <img src={require("../assets/img/av.png")} alt="user profile" className="mt-neg100 mb-4 rounded-circle" width={128} />
          <div className="float-right">
            <Link to="profile/add"><button className="btn btn-md btn-gray200 mr-2">Add Company</button></Link>
            {/* <Link to="profile/edit"><button className="btn btn-md btn-gray200 mr-2">Edit Profile</button></Link> */}
            {/* <Link to="profile/account"><button className="btn btn-md btn-gray200">Account</button></Link> */}
          </div>
          <h1 className="font-weight-bold title">Sal</h1>
          <p>
            I love Art, Web Design, Photography, Design, Illustration
          </p>
        </div>
      </main>
      </div>
    )
  }
}
export default ProfileCamp;