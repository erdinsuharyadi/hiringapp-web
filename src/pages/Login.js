import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
// import logoImg from "../img/logo.jpg";
// import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [setIsError] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function postLogin() {
    axios.post("http://localhost:4000/auth/login/", {
      username,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data.result.token);
        localStorage.setItem("username", username);
        // authTokens(result.data.result.token);
        alert("Login Success!")
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
          {/* <form> */}
              <span className="login100-form-title p-b-26">
                Login
              </span>
              {/* <span className="login100-form-title p-b-48">
                <i className="zmdi zmdi-font" />
              </span> */}
              <div className="wrap-input100">
                <label> </label>
                <input className="input100" 
                type="text"
                value={username}
                onChange={e => {
                  setUserName(e.target.value);
                }}


                />
                <span className="focus-input100" data-placeholder="Username" />
              </div>
              <div className="wrap-input100" data-validate="Enter password">
                <label> </label>
                <span className="btn-show-pass">
                  {/* <i className="zmdi zmdi-eye" /> */}
                </span>
                <input className="input100" 
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}

                />
                <span className="focus-input100" data-placeholder="Password" />
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button className="login100-form-btn" type="button"  onClick={postLogin}>
                    Login
                  </button>
                </div>
              </div>
              <div className="text-center p-t-50">
                <span className="txt1">
                  Don’t have an account? <Link className="txt2" to="/signup">
                  Sign Up
                </Link>
                </span>
              </div>
              {/* </form> */}
          </div>
        </div>
      </div>
  );
}

export default Login;



// import React, { Component } from 'react'
// import {Link, Redirect} from 'react-router-dom'
// // import {PostData} from '../services/PostData'
// import axios from "axios";

// class Login extends Component {
//   constructor(props){
//     super(props)
//     this.state ={
//       username:'',
//       password:'',
//       redirect: false
//     }
//     this.login = this.login.bind(this)
//     this.onChange = this.onChange.bind(this)
//   }


//   async login() {
//     if(this.state.username && this.state.password){
//       try {
//         const response = await axios.post('http://localhost:4000/auth/login/', this.state );
//         console.log('Returned data:', response.data);
//         if(response.data) {
//           console.log(response.data.result.token);
//           localStorage.setItem("x-access-token", JSON.stringify(response.data.result.token));
//           this.setState({redirect: true})
//         }
//       } catch (e) {
//         console.log(`Axios request failed: ${e}`);
//       }
//     } else {
//       console.log("Login Error")
//     }
//   }

//   onChange(e) {
//     this.setState({[e.target.name]: e.target.value})
//   }

//   render() {
//     if(this.state.redirect){
//       return (<Redirect to={'/'} />)
//     }
//     return (
      // <div className="limiter">
      //   <div className="container-login100">
      //     <div className="wrap-login100">
            
      //         <span className="login100-form-title p-b-26">
      //           Welcome
      //         </span>
      //         <span className="login100-form-title p-b-48">
      //           <i className="zmdi zmdi-font" />
      //         </span>
      //         <div className="wrap-input100">
      //           <label> </label>
      //           <input className="input100" type="text" name="username" onChange={this.onChange} />
      //           <span className="focus-input100" data-placeholder="Username" />
      //         </div>
      //         <div className="wrap-input100" data-validate="Enter password">
      //           <label> </label>
      //           <span className="btn-show-pass">
      //             {/* <i className="zmdi zmdi-eye" /> */}
      //           </span>
      //           <input className="input100" name="password" type="password" onChange={this.onChange} />
      //           <span className="focus-input100" data-placeholder="Password" />
      //         </div>
      //         <div className="container-login100-form-btn">
      //           <div className="wrap-login100-form-btn">
      //             <div className="login100-form-bgbtn" />
      //             <button className="login100-form-btn" type="submit"  onClick={this.login}>
      //               Login
      //             </button>
      //           </div>
      //         </div>
      //         <div className="text-center p-t-50">
      //           <span className="txt1">
      //             Don’t have an account? <Link className="txt2" to="/signup">
      //             Sign Up
      //           </Link>
      //           </span>
      //         </div>
            
      //     </div>
      //   </div>
      // </div>
//     )
//   }
// }

// export default Login;