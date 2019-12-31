import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { axiosGet } from "../../utils/API";

class ProfileCamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj_compuser: {}
    };

  }

  getData = url => {
    return axiosGet(url);
  };

  async componentDidMount() {
    let username = this.props.match.params.username;
    const resProj = await this.getData("/company/user/" + username);
    const dataProj = resProj.data.result[0];

    console.log(dataProj);
    if (dataProj) {
      this.setState({ obj_compuser: dataProj });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <main role="main">
          <div
            className="jumbotron border-round-0 min-50vh"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/erdinsuharyadi/image/upload/v1575554391/hiringapp/assets/head-profile.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mb-4">
            <img
              src={this.state.obj_compuser.logo ? this.state.obj_compuser.logo : 'https://res.cloudinary.com/erdinsuharyadi/image/upload/v1576119042/hiringapp/assets/images.png'}
              alt="user profile"
              className="mt-neg100 mb-4 rounded-circle"
              width={128}
              height={128}
              
            />
            <div className="float-right">
              <Link to="/company/edit/">
                <button className="btn btn-md btn-gray200 mr-2 mb-2">
                  Edit Company
                </button>
              </Link>
              <Link to="/company/project/">
                <button className="btn btn-md btn-gray200 mr-2 mb-2">
                  Project
                </button>
              </Link>
              {/* <Link to="profile/account"><button className="btn btn-md btn-gray200">Account</button></Link> */}
            </div>
            <h1 className="font-weight-bold title">
              {this.state.obj_compuser.name ? this.state.obj_compuser.name : 'Your Name'}
            </h1>
            {/* <p>I love Art, Web Design, Photography, Design, Illustration</p> */}
          </div>
        </main>
        <section className="bg-gray200 pt-4 pb-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7">
                <article className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <p className="mb-2">
                        Company Name:
                        <br /> <b>{this.state.obj_compuser.name_company ? this.state.obj_compuser.name_company : 'Your company name'}</b>
                      </p>
                    </div>
                    <div className="form-group">
                      <p className="mb-2">
                        Location:
                        <br /> <b>{this.state.obj_compuser.location ? this.state.obj_compuser.location : 'Your location'}</b>
                      </p>
                    </div>
                    <div className="form-group">
                      <p className="mb-2">
                        Description:
                        <br /> <b>{this.state.obj_compuser.description ? this.state.obj_compuser.description : 'Decription'}</b>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <Footer />
          </div>
        </section>
      </div>
    );
  }
}
export default ProfileCamp;
