import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { axiosPost } from '../utils/API'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Hire extends Component {
  constructor(props){
    super(props)
    let idEng = this.props.match.params.idEngineer
    // console.log(idEng)
    this.state = {
        projectname:'',
        description:'',
        period:'',
        deadline:'',
        salary:'',
        id_eng: idEng,
        redirect: false
      }
    this.hire = this.hire.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async hire(){
    try {
      const response = await axiosPost('http://localhost:4000/hire/', {
        project_name: this.state.projectname,
        description: this.state.description,
        period:this.state.period,
        deadline:this.state.deadline,
        salary:this.state.salary,
        id_eng: this.state.id_eng,
      });
      console.log('Returned data:', response.data);
      if(response.data.result.affectedRows === 1) {
        alert("Submit form successful!")
        this.setState({redirect: true})
      }
      // if(response.data) {
      //   // localStorage.setItem("tokens", JSON.stringify(response.data));
      //   // setAuthTokens(data);
      //   alert("Register Success!")
      //   // this.setState({redirect: true})
      // }
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state)
  }

  async handleSubmit(e) {
    e.preventDefault();    
  }

  render () {
    if(this.state.redirect){
      return (<Redirect to={'/'} />)
    }

    return (
      <div>
     <Header/> 
      <section className="bg-gray200 pt-6 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <article className="card">
                <img className="card-img-top mb-2" alt="engineer identity" src="https://res.cloudinary.com/erdinsuharyadi/image/upload/v1575001317/hiringapp/assets/hireheader.png" />
                <div className="card-body">
                  <h1 className="card-title display-4">
                    Hire Form </h1>
                  <ul>
                    <li>Field this form to get software engineer</li>
                  </ul>
                  <hr/>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <p>Project Name:</p>
                      <input className="form-control" type="text" name="projectname" autoComplete="off" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                      <p>Description:</p>
                      <textarea className="form-control" name="description" autoComplete="off" onChange={this.onChange}></textarea>
                    </div>
                    <div className="form-group">
                      <p>Period:</p>
                    <input className="form-control" type="text" name="period" autoComplete="off" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                      <p>Estimated Deadline:</p>
                      <input className="form-control" type="date" name="deadline" autoComplete="off" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                      <p>Salary:</p>
                      <input className="form-control" type="text" name="salary" autoComplete="off" onChange={this.onChange}/>
                    </div>
                    <div className="form-group text-center">
                      <button type="button" className="btn btn-md btn-primary mt-4" onClick={this.hire}>Submit</button>
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

export default Hire