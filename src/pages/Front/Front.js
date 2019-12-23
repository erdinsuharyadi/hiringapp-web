import React from 'react';
import {Link} from 'react-router-dom'
import './Front.css';
export default class Front extends React.Component{
    render(){
      return(
        <div>
        <section id="home">
        <div className="container">
          <div className="row">
            
            <div className="col-md-6 caption text-center ">
            
              <h1 className="titles">FIND & HIRE<br/>Expert Software Engineers</h1>             
              <h2 className="desc">Find good software engineers online with great experience</h2><br/>
              

            </div>
            {/* Sign Up */}
            
            <div className="col-md-6 mt-6">
             
              <form className="signup-form">
                <h2 className="text-center sign">Welcome to HiringNesia App</h2>
                <hr />
                <div className="form-group text-center">
                  <Link to="/signup"><button type="submit" className="btn btn-primary btn-block">Sign up</button></Link>
                </div>
                
                <div className="form-group mt-4 text-center">
                  <Link to="/login"><button type="submit" className="btn btn-md btn-gray200 btn-block">Log in</button></Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
    
      
      )
    }
  }