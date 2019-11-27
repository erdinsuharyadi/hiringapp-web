import React, { Component } from 'react'
import Footer from '../components/Footer'

class Hire extends Component {
  render () {
    return (
      <section className="bg-gray200 pt-5 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <article className="card">
                <img className="card-img-top mb-2" alt="image engineer" src="https://images.pexels.com/photos/157661/young-woman-shooting-model-157661.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                <div className="card-body">
                  <h1 className="card-title display-4">
                    Hire Form </h1>
                  <ul>
                    <li>5 cups short-grain sushi rice</li>
                  </ul>
                  <hr/>
                  <form>
                    <div className="form-group">
                      <p>Project Name:</p>
                      <input className="form-control" type="text"/>
                    </div>
                    <div className="form-group">
                      <p>Project Type:</p>
                      <input className="form-control" type="text"/>
                    </div>
                    <div className="form-group">
                      <p>Description:</p>
                      <textarea className="form-control" ></textarea>
                    </div>
                    <div className="form-group">
                      <p>Period:</p>
                    <input className="form-control" type="text"/>
                    </div>
                    <div className="form-group">
                      <p>Deadline:</p>
                      <input className="form-control" type="date"/>
                    </div>
                    <div className="form-group">
                      <p>Salary:</p>
                      <input className="form-control" type="text"/>
                    </div>
                    <div className="form-group text-center">
                      <button type="submit" className="btn btn-md btn-primary" >Submit</button>
                    </div>
                  </form>
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

export default Hire