import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import logoImg from "../img/logo.jpg";
// import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../../context/auth";
// import { log } from "util";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  async function postLogin(field) {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login/",
        field
      );
      console.log("Returned data:", response.data);
      if (response.data.status === 200) {
        axios.defaults.headers.common["Authorization"] = response.data.result.token;
        setAuthTokens(response.data.result.token);
        localStorage.setItem("username", field.username);
        alert("Login Success!");
        setLoggedIn(true);
      } else {
        setIsError(true);
        alert("Login Failed!");
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

  if (isLoggedIn) {
    return window.location.href = "/home";;
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
              postLogin(fields)
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
                      (errors.username && touched.username ? " is-invalid" : "")
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
                      (errors.password && touched.password ? " is-invalid" : "")
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

export default Login;
