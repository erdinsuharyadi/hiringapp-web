import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Auth from '../../context/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import {getEngineer, getCompany} from '../../redux/Actions/User';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
       login : false,
       role: '',
    }
    
    this.postLogin = this.postLogin.bind(this);
  }

  async setDatauser (username) {

    if (this.state.role === '2') {
       await this.props.setDataEngineer(username);
    }
    if (this.state.role === '1' ) {
       await this.props.setDataCompany(username);
    }
     Auth.loginAuth(() => {
       this.setState({login: true})
    })
  }


  postLogin(field) {        
    axios({
       method: 'post',

       url: 'http://3.82.228.249:2000/auth/login',

       headers: {'Content-Type': 'application/json'},
       data: field

    }).then(response => {
       const result = response.data.result

       this.setState({role: result.level})
       localStorage.setItem('login', true)
       localStorage.setItem("username", field.username);
       localStorage.setItem("x-access-token", JSON.stringify(result.token));
       this.setState({login: true})
       this.setDatauser(field.username);
      alert("Login Success!");
    }).catch(err => {
       if (err.response) {
          const result = err.response.data.result
          alert(result[0]);
       }
       if (err.request) {
          return console.log(err.request)
       }
       else {
          return console.log(err)
       }
    })
    // event.preventDefault()
  }  


  render() {
    if (this.state.login) {
      return <Redirect to={'/home'} />
   }
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <Formik
              initialValues={{
                username: "",
                password: ""
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required("Username is required"),
                password: Yup.string()
                  .min(6, "Password must be at least 6 characters")
                  .required("Password is required")
              })}
              onSubmit={fields => {
                this.postLogin(fields);
              }}
            >
              {({ errors, status, touched }) => (
                <Form>
                  <span className="login100-form-title p-b-26">Login</span>
                  {/* <span className="login100-form-title p-b-48">
                  <i className="fa fa-search" />
                </span> */}
                  <div className="mb-4">
                    <label htmlFor="username">Username</label>
                    <Field
                      name="username"
                      type="text"
                      className={
                        "form-control" +
                        (errors.username && touched.username
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-4" data-validate="Enter password">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn" />
                      <button className="login100-form-btn" type="submit">
                        Login
                      </button>
                    </div>
                  </div>
                  <div className="text-center p-t-50">
                    <span className="txt1">
                      Don’t have an account?{" "}
                      <Link className="txt2" to="/signup">
                        Sign Up
                      </Link>
                    </span>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToPropps = (dispatch) => {

  return {
     setDataEngineer: bindActionCreators(getEngineer, dispatch),
     setDataCompany : bindActionCreators(getCompany, dispatch)
  };
}

export default connect (null, mapDispatchToPropps)(Login);