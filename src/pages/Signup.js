import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      name: "",
      level: "",
      redirect: false
    };
    this.regis = this.regis.bind(this);
    this.onChange = this.onChange.bind(this);
    this.OneEffect = this.OneEffect.bind(this);
    this.OfEffect = this.OfEffect.bind(this);
    this.errors = this.errors.bind(this);
  }

  async regis(event) {
    console.log("function regis click");
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register/",
        this.state
      );
      console.log("Returned data:", response.data);
      if (response.data.status === 200) {
        alert("Register Success!");
        this.setState({ redirect: true });
      }
    } catch (err) {
      if (err.response) {
        return console.log(err.response.data.result[0]);
      }
      if (err.request) {
        return console.log("error from request", err.request);
      } else {
        console.log("unknown error");
      }
    }
    event.preventDefault();
  }

  errors(err) {
    if (err.response) {
      console.log("error from response", err.response.status);
    }
    if (err.request) {
      console.log("error from request", err.request);
    } else {
      console.log("unknown error");
    }
  }

  OneEffect(event) {
    event.target.classList.add("spanChange");
  }

  OfEffect(event) {
    if (event.target.value === "") {
      event.target.classList.remove("spanChange");
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  // }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form onSubmit={this.regis}>
              <span className="login100-form-title p-b-26">Sign Up</span>
              {/* <span className="login100-form-title p-b-48">
                <i className="zmdi zmdi-font" />
              </span> */}
              <div className="wrap-input100">
                <label> </label>
                <input
                  className="input100"
                  type="text"
                  name="name"
                  autoComplete="off"
                  onChange={this.onChange}
                  onFocus={this.OneEffect}
                  onBlur={this.OfEffect}
                />
                
                <span className="focus-input100" data-placeholder="Full Name" />
              </div>
              <div className="wrap-input100">
                <label> </label>
                <input
                  className="input100"
                  type="text"
                  name="username"
                  autoComplete="off"
                  onChange={this.onChange}
                />
                <span className="focus-input100" data-placeholder="Username" />
              </div>
              <div className="wrap-input100" data-validate="Enter password">
                <label> </label>
                <span className="btn-show-pass"></span>
                <input
                  className="input100"
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={this.onChange}
                />
                <span className="focus-input100" data-placeholder="Password" />
              </div>
              <div className="wrap-input100" data-validate="Enter password">
                <label> </label>
                <span className="btn-show-pass"></span>
                <input
                  className="input100"
                  type="password"
                  name="confirmpass"
                  autoComplete="off"
                  onChange={this.onChange}
                />
                <span
                  className="focus-input100"
                  data-placeholder="Confirm Password"
                />
              </div>
              <div className="wrap-input100">
                <label> </label>
                <input
                  className="input100"
                  type="text"
                  name="email"
                  autoComplete="off"
                  onChange={this.onChange}
                />
                <span className="focus-input100" data-placeholder="Email" />
              </div>
              <div className="wrap-input100">
                <label> </label>
                <label> </label>
                <select
                  className="input100"
                  value={this.state.value}
                  onChange={this.onChange}
                  name="level"
                >
                  <option value="0">Who are you?</option>
                  <option value="1">Company</option>
                  <option value="2">Engineer</option>
                </select>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button
                    className="login100-form-btn"
                    type="button"
                    onClick={this.regis}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="text-center p-t-50">
                <span className="txt1">
                  Do you have an account?{" "}
                  <Link className="txt2" to="/login">
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
