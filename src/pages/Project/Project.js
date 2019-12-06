import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardProject from "../../components/CardProject";
import { axiosGet } from "../../utils/API";
import moment from "moment";

class Project extends Component {
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
    const response = await this.getData("/project/");
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
            <div className="float-right">
            <Link to="/company/project/add"><button className="btn btn-md btn-gray200 mr-2 mb-2">Add Project</button></Link>
            </div>
            <h1 className="font-weight-bold title mb-3">List Project</h1>
            
            <hr />

            {this.state.arr_project.map((val, idx) => (
              <CardProject
                key={idx}
                datepost={moment
                            .utc(val.createProjEng)
                            .format("LLLL")}
                projectname={val.project_name}
                projectdesc={val.description}
                idproject={val.id_project}
              />
            ))}

            
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Project;
