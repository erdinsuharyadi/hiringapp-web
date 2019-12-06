import React, { Component } from 'react';
import CardEngineer from '../../components/CardEngineer';
import Footer from '../../components/Footer'
import Header from '../../components/Header';
import { axiosGet } from '../../utils/API'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      arr_engineer: [],
    }
    
  }

  getData = (url) => {
    return axiosGet(url)
  }

  async componentDidMount() {
    const response = await this.getData('/engineer/');
    let res = response.data.result
    console.log(response.data.result)
    if (response.data) {
      this.setState({ arr_engineer: res }) 
    }
  }

  render() {
    return (
      <div>
      <Header />
        <div className="container-fluid p-t-120">
          <div className="row">
            <div className="card-columns">

              {this.state.arr_engineer.map((val, idx) => (
                <CardEngineer key={idx} ideng={val.id_eng} title={val.name_eng} job={val.job} img={val.photo} skill={val.name_skill} totSuccess={val.successProj} rateProj={Math.round(val.rateSuccess)} />
              ))}

             
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home;