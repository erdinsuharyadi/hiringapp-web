import React, { Component } from 'react'
import Footer from '../components/Footer'
import { FaHandshake } from 'react-icons/fa'
import { Link } from 'react-router-dom'

class Engineer extends Component {
  
  render() {
    return (
      <section className="bg-gray200 pt-5 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <article className="card">
                <img className="card-img-top mb-2" src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e0245bb4e87077312cc3d102e68c1efd&auto=format&fit=crop&w=735&q=80" alt="Card image" />
                <div className="card-body">
                  <h1 className="card-title display-4">
                    Sushi Rolls </h1>
                  <ul>
                    <li>5 cups short-grain sushi rice</li>
                    <li>6 cups water</li>
                    <li>1/2 cup rice vinegar</li>
                    <li>2 tablespoons sugar</li>
                    <li>A teaspoon of salt</li>
                  </ul>
                  
                  <center>
                    <button className="d-block"><Link className="btn btn-md btn-gray200" to="/hire"><FaHandshake /> Hire</Link></button>
                  </center>
                 
                </div>
              </article>
            </div>
          </div>
          <Footer />
        </div>
      </section>
    )
  }
}


export default Engineer