import React, { Component } from 'react';
import CardEngineer from '../components/CardEngineer';
import Footer from '../components/Footer'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid p-t-80">
          <div className="row">
            <div className="card-columns">
              <CardEngineer title="Glowing" />
              <CardEngineer img="https://cdn.pixabay.com/photo/2016/10/09/18/03/smile-1726471_960_720.jpg" />
              <CardEngineer title="Priani" img="https://i.pinimg.com/564x/0c/e0/b9/0ce0b9f95f39b96d20910381b6e1e0b1.jpg" />
              <CardEngineer title="Kriani" img="https://images.pexels.com/photos/157661/young-woman-shooting-model-157661.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />              
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home;