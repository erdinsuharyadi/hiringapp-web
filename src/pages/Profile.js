import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Profile extends Component {
  render() {
    return (
      <main role="main">
        <div className="jumbotron border-round-0 min-50vh" style={{backgroundImage: 'url(https://timelinecovers.pro/facebook-cover/download/pimple-a-simple-php-dependency-injection-container-facebook-cover.jpg)', backgroundSize: '100%'}} >
        </div>
        <div className="container mb-4">
          <img src={require("../assets/img/av.png")} alt="Photo Profile" className="mt-neg100 mb-4 rounded-circle" width={128} />
          <Link to="/profile/edit"><button className="btn btn-md btn-gray200  float-right">Edit Profile</button></Link>
          <h1 className="font-weight-bold title">Sal</h1>
          <p>
            I love Art, Web Design, Photography, Design, Illustration
          </p>
        </div>
      </main>
    )
  }
}
export default Profile;