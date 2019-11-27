import React from 'react'
import { Link } from 'react-router-dom'
import { FaCommentDots, FaBell, FaSearch } from 'react-icons/fa'

const Header = () => {

  return (
    <header className="header">

      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <Link to="/" className="navbar-brand font-weight-bolder mr-3"><img src={require("../assets/img/logo-arka.png")} alt="logo" width={80} /></Link>
        <button className="navbar-light navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDefault" aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarsDefault">
        
          <ul className="navbar-nav col-md-10 align-items-center">
            <div className="input-group mt-2 mb-2 col-md-8">
              <input className="form-control bg-graylight border-right-0 border " type="search" placeholder="Search..." id="example-search-input" autoComplete="off" />
              <span className="input-group-append border-0">
                <div className="input-group-text bg-graylight"><FaSearch /></div>
              </span>
            </div>

            <li className="nav-item ml-8 mt-2 mb-2">
              <Link className="navbar-brand" to="/">Home</Link>
            </li>
            <li className="nav-item ml-2">
              <Link className="navbar-brand" to="/profile"><img className="rounded-circle mr-2" src={require("../assets/img/av.png")} alt="Profile" width={30} /><span className="align-middle">Profile</span></Link>
            </li>

            <div className="vl" />

            <li className="nav-item">
              <Link className="navbar-brand" to="/login">
                <span className="ml-5 " >
                  <FaCommentDots size={30} />
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="navbar-brand" to="/signup">
                <span className="ml-5 mr-2" >
                  <FaBell size={30} />
                </span>
              </Link>
            </li>

            <li className="nav-item dropdown mr-auto">
              <a className="nav-link" href="#" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg style={{ marginTop: '10px' }} className="_3DJPT" version="1.1" viewBox="0 0 32 32" width={21} height={21} aria-hidden="false" data-reactid={71}><path d="M7 15.5c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5zm21.5-3.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zm-12.5 0c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z" data-reactid={22} /></svg>
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow-lg" aria-labelledby="dropdown02">
                
                <div className="dropdown-divider">
                </div>
                
              </div>
            </li>

          </ul>
          
        </div>
      </nav>


    </header>
  );
}

export default Header;
