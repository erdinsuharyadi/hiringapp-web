import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  async regis(field) {
    console.log("function regis click");
    try {
      const response = await axios.post(
        "http://3.82.228.249:2000/auth/register/",
        field
      );
      console.log("Returned data:", response.data);
      if (response.data.status === 200) {
        alert("Register Success!");
        this.setState({ redirect: true });
      }
    } catch (err) {
      if (err.response) {
        return console.log(err.response.data.result);
      }
      if (err.request) {
        return console.log("error from request", err.request);
      } else {
        console.log("unknown error");
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <Formik
              initialValues={{
                name: "",
                username: "",
                password: "",
                // confirmPassword: "",
                email: "",
                level: "1",
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required("Username is required"),
                password: Yup.string()
                  .min(6, "Password must be at least 6 characters")
                  .required("Password is required"),
                // confirmPassword: Yup.string()
                //   .oneOf([Yup.ref("password"), null], "Passwords must match")
                //   .required("Confirm Password is required"),
                email: Yup.string()
                  .email("Email is invalid")
                  .required("Email is required"),
                name: Yup.string().required("Name is required"),
                // level: Yup.string().required("required")
              })}
              onSubmit={fields => {
                this.regis(fields)
              }}
              >
              {({ errors, status, touched }) => (
                <Form>
                  <span className="login100-form-title p-b-26">Sign Up</span>
                  {/* <span className="login100-form-title p-b-48">
                <i className="zmdi zmdi-font" />
              </span> */}
                  <div className="mb-4">
                    <label>Fullname</label>
                    <Field
                      name="name"
                      type="text"
                      className={
                        "form-control" +
                        (errors.name && touched.name ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Username</label>

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
                    <label>Password</label>
                    <span className="btn-show-pass"></span>
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
                  {/* <div className="mb-4" data-validate="Enter password">
                    <label>Confirm Password</label>
                    <span className="btn-show-pass"></span>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={
                        "form-control" +
                        (errors.confirmPassword && touched.confirmPassword
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div> */}
                  <div className="mb-4">
                    <label>Email</label>
                    <Field
                      name="email"
                      type="email"
                      className={
                        "form-control" +
                        (errors.email && touched.email
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Who are you?</label>
                    <Field as="select" name="level" className="form-control">
                      <option value="1">Company</option>
                      <option value="2">Engineer</option>
                    </Field>
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
                      Do you have an account?{" "}
                      <Link className="txt2" to="/login">
                        Login
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

export default Signup;
