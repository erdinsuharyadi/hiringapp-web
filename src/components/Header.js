import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { FaCommentDots, FaBell } from "react-icons/fa";
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logout: false,
    };
    this.logout = this.logout.bind(this);
  }

  logout () {
    localStorage.clear();
    this.setState({logout: true})
 }

  render() {
    if (this.state.logout) {
      return <Redirect to={'/login'}/>;
   }
   
    return (
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
          <Link to="/home" className="navbar-brand font-weight-bolder mr-3">
            <img
              src={require("../assets/img/logo-HiringNesia.png")}
              alt="logo"
              width={120}
            />
          </Link>
          <button
            className="navbar-light navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsDefault"
            aria-controls="navbarsDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarsDefault">
            <ul className="navbar-nav col-md-10 align-items-center">
              {/* <div className="input-group mt-2 mb-2 col-md-8">
                <input className="form-control bg-graylight border-right-0 border " type="search" placeholder="Search..." id="example-search-input" autoComplete="off" />
                <span className="input-group-append border-0">
                  <div className="input-group-text bg-graylight"><FaSearch /></div>
                </span>
              </div> */}
              <div className="input-group mt-2 mb-2 mr-10 col-md-6">
                <input
                  className="form-control py-4 border-right-0 border"
                  type="search"
                  placeholder="Search ..."
                  id="example-search-input"
                />
                <span className="input-group-append">
                  <button
                    className="btn btn-outline-secondary border-left-0 border"
                    type="button"
                  >
                    <i className="fa fa-search" />
                  </button>
                </span>
              </div>

              <li className="nav-item ml-8 mt-2 mb-2">
                <Link className="navbar-brand" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item ml-2">
                <Link 
                className="navbar-brand" 
                to={"/"+(this.props.dataUser.level === '1'? 'company' : 'engineer')+"/profile/"+localStorage.getItem('username')}>
                  <img
                    className="rounded-circle mr-2"
                    src={this.props.dataUser.photo || this.props.dataUser.logo || 'https://res.cloudinary.com/erdinsuharyadi/image/upload/v1577793878/hiringapp/assets/avatar.jpg'}
                    alt="Profile"
                    width={30}
                    height={30}
                  />
                  <span className="align-middle">{this.props.dataUser.name || this.props.dataUser.name_eng || 'Your Name'}</span>
                </Link>
              </li>

              <div className="vl" />

              <li className="nav-item dropdown ml-4 mr-auto">
                <Link
                  to="#"
                  className="nav-link"
                  id="dropdown02"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    style={{ marginTop: "10px" }}
                    className="_3DJPT"
                    version="1.1"
                    viewBox="0 0 32 32"
                    width={21}
                    height={21}
                    aria-hidden="false"
                    data-reactid={71}
                  >
                    <path
                      d="M7 15.5c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5zm21.5-3.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zm-12.5 0c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z"
                      data-reactid={22}
                    />
                  </svg>
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right shadow-lg"
                  aria-labelledby="dropdown02"
                >

                  <button onClick={this.logout} className="logout"> Logout</button>
                  
                  {/* <div className="dropdown-divider"></div> */}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
     dataUser: state.data.userData
  }
}

export default connect(mapStateToProps)(Header);