import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardOffer from "../../components/CardOffer";
import { axiosGet } from "../../utils/API";
import moment from "moment";

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr_project: []
    };
  }

  getData = url => {
    return axiosGet(url);
  };

  async componentDidMount() {
    const response = await this.getData("project/engineer/");
    let res = response.data.result;
    if (response.data.status === 200) {
      console.log(res);
      this.setState({ arr_project: res });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <main role="main">
          <div className="jumbotron border-round-0 mt-2 min-50vh" style={{backgroundImage: 'url(https://res.cloudinary.com/erdinsuharyadi/image/upload/v1575545937/hiringapp/assets/head-jumbotron-offer-eng.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} >
          </div>
          <div className="container mb-4">
            <h1 className="font-weight-bold title mb-3">Project Offer</h1>
            <hr />

            {this.state.arr_project.map((val, idx) => (
              <CardOffer
                key={idx}
                companyname={val.name}
                datepost={moment
                            .utc(val.createProjEng)
                            .format("llll")}
                projectname={val.project_name}
                projectdesc={val.description}
                sts_project_eng={val.sts_project_eng}
                idproject={val.id_project}
                ideng={val.id_eng}
              />
            ))}

            
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Offer;
