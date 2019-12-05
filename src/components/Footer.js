import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer pt-3 pb-3 text-center">
      <div className="container">
        <p>©  <span className="credits font-weight-bold">
          <Link target="_blank" className="text-dark" to="erdinsuharyadi"  ><u>Hiring App</u> by Erdin Suharyadi</Link>
        </span>
        </p>
      </div>
    </footer>
  )
}
export default Footer