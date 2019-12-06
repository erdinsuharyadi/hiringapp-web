import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { axiosPut } from "../../utils/API";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { axiosGet } from "../../utils/API";
import moment from "moment"

class ProjectEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj_proj: {},
      projectname: "",
      description: "",
      period: "",
      deadline: "",
      redirect: false
    };
    this.updateProj = this.updateProj.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getData = url => {
    return axiosGet(url);
  };

  async componentDidMount() {
    const idProj = this.props.match.params.idProj
    const response = await this.getData("/project/id/"+idProj);
    const res = response.data.result[0];    
    if (response.data) {
      console.log(res);
      this.setState({ obj_proj: res });
    }
  }

  async updateProj() {
    try {
      const response = await axiosPut("/project/"+this.props.match.params.idProj, {
        project_name: this.state.projectname || this.state.obj_proj.project_name,
        description: this.state.description || this.state.obj_proj.description,
        period: this.state.period || this.state.obj_proj.period,
        deadline: this.state.deadline || this.state.obj_proj.deadline,
      });
      
      console.log("Returned data:", response.data);
      if (response.data.result.changedRows === 1) {
        alert("Update Success!");
        this.setState({redirect: true})
      } else {
        alert("Update Failed!");
      }
    } catch (e) {
      alert("Update error!")
      console.log(`Axios request failed: ${e}`);
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/company/project/view/"+this.props.match.params.idProj} />;
    }

    return (
      <div>
        <Header />
        <section className="bg-gray200 pt-6 pb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7">
                <article className="card">
                  <img
                    className="card-img-top mb-2"
                    alt="engineer identity"
                    src="https://res.cloudinary.com/erdinsuharyadi/image/upload/v1575438930/hiringapp/assets/projectheader.png"
                  />
                  <div className="card-body">
                    <h1 className="card-title display-4 text-center">Update Project Form</h1>
                    <ul>
                      <li>Field this form to update your project</li>
                    </ul>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <p>Project Name:</p>
                        <input
                          defaultValue={this.state.obj_proj.project_name}
                          className="form-control"
                          type="text"
                          name="projectname"
                          autoComplete="off"
                          placeholder="Your project name"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Description:</p>
                        <textarea
                          defaultValue={this.state.obj_proj.description}
                          className="form-control"
                          name="description"
                          autoComplete="off"
                          placeholder="Detail your project"
                          onChange={this.onChange}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <p>Period:</p>
                        <input
                          defaultValue={this.state.obj_proj.period}
                          className="form-control"
                          type="text"
                          name="period"
                          autoComplete="off"
                          placeholder="ex: 2 Month"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Estimated Deadline:</p>
                        <input
                          className="form-control"
                          type="date"
                          name="deadline"
                          defaultValue={moment
                            .utc(this.state.obj_proj.deadline)
                            .format("YYYY-MM-DD")}
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group text-right">
                        <Link to={"/company/project/view/"+this.props.match.params.idProj}>
                          <button className="btn btn-md btn-light mt-4 mr-3 mb-2">
                            Cancel
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-md btn-primary mt-4 mb-2"
                          onClick={this.updateProj}
                        >
                          Submit
                        </button>
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
    );
  }
}

export default ProjectEdit;
