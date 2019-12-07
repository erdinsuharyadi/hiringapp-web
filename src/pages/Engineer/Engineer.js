import React, { Component } from 'react'
import Footer from '../../components/Footer'
import { FaHandshake, FaCheckCircle, FaStar, FaExternalLinkSquareAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import { axiosGet } from '../../utils/API'

class Engineer extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      arr_engineer: '',
    }
    
  }

  getData = (url) => {
    return axiosGet(url)
  }

  async componentDidMount() {
    let idEng = this.props.match.params.idEngineer
    const response = await this.getData('/engineer/id/'+idEng);
    let res = response.data.result[0]
    
    if (response.data) {
      // const arr_skill = res.map(i => ({ value: i.id_skill, label: i.name_skill }))
      // console.log(res.dob)
      this.setState({ arr_engineer: res }) 
    }
  }

  render() {
    // console.log(this.state.arr_engineer.dob)
    return (
      <div>
      <Header/>>
      <section className="bg-gray200 pt-6 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <article className="card">
                <img className="card-img-top mb-2" src={this.state.arr_engineer.photo} alt="Card Personality" />
                <div className="card-body">
                  <h1 className="card-title display-4 text-center">
                  {this.state.arr_engineer.name_eng} </h1>
                  <ul>
                    <li><hr/></li>
                    <li className="text-center"><FaCheckCircle/> : {this.state.arr_engineer.successProj} Project | <FaStar/> : {this.state.arr_engineer.rateSuccess}% Success</li>
                    <li><hr/></li>
                    <li>Profession: {this.state.arr_engineer.job}</li>
                    <li>Location : {this.state.arr_engineer.location}</li>
                    <li>No Contact : {this.state.arr_engineer.no_hp}</li>
                    <li>Skill : {this.state.arr_engineer.name_skill}</li>
                  </ul>
                  
                  <div className="mt-5 text-center">
                    
                      <button><a className="btn btn-md btn-gray200 mr-3" href={this.state.arr_engineer.showcase} ><FaExternalLinkSquareAlt /> Showcase</a></button>
                      <button><Link className="btn btn-md btn-primary" to={'/hire/'+this.state.arr_engineer.id_eng}><FaHandshake /> Hire</Link></button>
                    
                  </div>

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


export default Engineer