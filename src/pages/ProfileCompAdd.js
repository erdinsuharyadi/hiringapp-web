import React, { Component } from 'react'
import Footer from '../components/Footer'
import { axiosPost } from '../utils/API'
import {Redirect} from 'react-router-dom'
import Header from '../components/Header'

class ProfileCompAdd extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {
        name: '',
        logo: null,
        location: '',
        description: '',
      },
      redirect: false
    }
    this.addCompany = this.addCompany.bind(this)
    this.onChange = this.onChange.bind(this)
  }


  async addCompany() {
    try {
      console.log("klik tombol submit")
      console.log(this.state)
      const response = await axiosPost('http://localhost:4000/company/', this.state.data)

      console.log('Returned data:', response);
      if(response.data.status === 200) {
        // localStorage.setItem("tokens", JSON.stringify(response.data));
        // setAuthTokens(data);
        alert("Submit Company Data Successful!")
        this.setState({redirect: true})
      }
    } catch (e) {
      console.log(e);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state)
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
  }


  render() {
    if(this.state.redirect){
      return (<Redirect to={'/company/profile'} />)
    }
    return (
      <div>
        <Header />
        <section className="bg-gray200 pt-8 pb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7">
                <article className="card">
                  <div className="card-body">
                    <h1 className="card-title display-4 text-center">
                      Add Company </h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}>

                      <div className="form-group">
                        <p>Company Name:</p>
                        <input className="form-control" type="text" name="name" autoComplete="off" onChange={this.onChange} />
                      </div>
                      <div className="form-group">
                        <p>Location:</p>
                        <input className="form-control" type="text" name="location" autoComplete="off" onChange={this.onChange} />
                      </div>
                      <div className="form-group">
                        <p>Description:</p>
                        <textarea className="form-control" name="description" onChange={this.onChange}></textarea>
                      </div>


                      <div className="form-group p-t-15">
                        <button className="btn btn-md btn-light mr-3">Cancel</button>
                        <input type="submit" className="btn btn-md btn-primary" value="Submit" onClick={this.addCompany} />
                      </div>
                    </form>

                  </div>
                </article>
              </div>
            </div>
            <Footer />
          </div>
        </section>
      </div>
    )
  }
}

export default ProfileCompAdd
