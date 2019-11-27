import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Signup extends Component {
  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form">
              <span className="login100-form-title p-b-26">
                Welcome
              </span>
              <span className="login100-form-title p-b-48">
                <i className="zmdi zmdi-font" />
              </span>
              <div className="wrap-input100">
                <label> </label>
                <input className="input100" type="text" name="fullname" />
                <span className="focus-input100" data-placeholder="Full Name" />
              </div>
              <div className="wrap-input100">
                <label> </label>
                <input className="input100" type="text" name="username" />
                <span className="focus-input100" data-placeholder="Username" />
              </div>
              <div className="wrap-input100" data-validate="Enter password">
                <label> </label>
                <span className="btn-show-pass">
                </span>
                <input className="input100" type="password" name="pass" />
                <span className="focus-input100" data-placeholder="Password" />
              </div>
              <div className="wrap-input100" data-validate="Enter password">
                <label> </label>
                <span className="btn-show-pass">
                </span>
                <input className="input100" type="password" name="pass" />
                <span className="focus-input100" data-placeholder="Confirm Password" />
              </div>
              <div className="wrap-input100">
                <label> </label>
                <input className="input100" type="text" name="email" />
                <span className="focus-input100" data-placeholder="Email" />
              </div>
              <div className="wrap-input100">
                <label> </label>
                <label> </label>
                <select className="input100">
                  <option value="0" selected="true" disabled="disabled">Who are you?</option>
                  <option value="1">Company</option>
                  <option value="2">Engineer</option>
                </select>
              </div>
              
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button className="login100-form-btn" type="submit">
                    Submit
                  </button>
                </div>
              </div>
              <div className="text-center p-t-50">
                <span className="txt1">
                  Do you have an account? <Link className="txt2" to="/login">Login</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;