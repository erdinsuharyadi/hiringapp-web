import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { axiosGet } from "../utils/API";
import moment from "moment";

class ProfileEng extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj_enguser: {}
    }
  }

  getData = url => {
    return axiosGet(url);
  };

  async componentDidMount() {
    let username = this.props.match.params.username;
    const resProj = await this.getData("/engineer/user/" + username);
    const dataProj = resProj.data.result[0];

    console.log(dataProj);
    if (dataProj) {
      this.setState({ obj_enguser: dataProj });
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
              src={this.state.obj_enguser.photo}
              alt="user profile"
              className="mt-neg100 mb-4 rounded-circle"
              width={128}
            />
            <div className="float-right">
              <Link to="/engineer/edit">
                <button className="btn btn-md btn-gray200 mr-2 mb-2">
                  Edit Profile
                </button>
              </Link>
              <Link to="/offer/">
                <button className="btn btn-md btn-gray200 mr-2 mb-2">
                  Project
                </button>
              </Link>
              {/* <Link to="profile/account"><button className="btn btn-md btn-gray200 mb-2">Account</button></Link> */}
            </div>
            <h1 className="font-weight-bold title">{this.state.obj_enguser.name_eng}</h1>
            <p>I love Art, Web Design, Photography, Design, Illustration</p>
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
                        Full Name:
                        <br /> <b>{this.state.obj_enguser.name_eng}</b>
                      </p>
                    </div>
                    <div className="form-group">
                      <p className="mb-2">
                        Date of Birth:
                        <br /> <b>{moment
                            .utc(this.state.obj_enguser.dob)
                            .format("DD-MM-YYYY")}</b>
                      </p>
                    </div>
                    <div className="form-group">
                      <p className="mb-2">
                        Location:
                        <br /> <b>{this.state.obj_enguser.location}</b>
                      </p>
                    </div>
                    <div className="form-group">
                      <p className="mb-2">
                        Email:
                        <br /> <b>{this.state.obj_enguser.email}</b>
                      </p>
                    </div>
                    <div className="form-group">
                      <p className="mb-2">
                        No HP:
                        <br /> <b>{this.state.obj_enguser.no_hp}</b>
                      </p>
                    </div>
                    <div className="form-group">
                      <p className="mb-2">
                        Profession:
                        <br /> <b>{this.state.obj_enguser.job}</b>
                      </p>
                    </div>
                    <div className="form-group">
                      <p className="mb-2">
                        Skill:
                        <br /> <b>{this.state.obj_enguser.name_skill}</b>
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
export default ProfileEng;
