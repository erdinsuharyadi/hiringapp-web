import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Header from '../components/Header';
class ProfileEng extends Component {
  render() {
    return (
      <div>
      <Header/>
      <main role="main">
        <div className="jumbotron border-round-0 min-50vh" style={{backgroundImage: 'url(https://res.cloudinary.com/erdinsuharyadi/image/upload/v1575554391/hiringapp/assets/head-profile.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} >
        </div>
        <div className="container mb-4">
          <img src={require("../assets/img/av.png")} alt="user profile" className="mt-neg100 mb-4 rounded-circle" width={128} />
          <div className="float-right">
            <Link to="profile/add"><button className="btn btn-md btn-gray200 mr-2 mb-2">Add Profile</button></Link>
            <Link to="profile/edit"><button className="btn btn-md btn-gray200 mr-2 mb-2">Edit Profile</button></Link>
            {/* <Link to="profile/account"><button className="btn btn-md btn-gray200 mb-2">Account</button></Link> */}
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
export default ProfileEng