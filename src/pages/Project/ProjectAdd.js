import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { axiosPost } from "../../utils/API";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

class ProjectAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      description: "",
      period: "",
      deadline: "",
      redirect: false
    };
    this.submitProject = this.submitProject.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async submitProject() {
    try {
      const response = await axiosPost("/project/", {
        project_name: this.state.projectname,
        description: this.state.description,
        period: this.state.period,
        deadline: this.state.deadline
      });
      console.log("Returned data:", response.data);
      if (response.data.result.affectedRows === 1) {
        alert("Submit form successful!");
        this.setState({ redirect: true });
      } else {
        alert("Submit form failed!");
      }
    } catch (e) {
      alert("Submit form error!")
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
      return <Redirect to={"/company/project/"} />;
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
                    <h1 className="card-title display-4 text-center">Project Form </h1>
                    <ul>
                      <li>Field this form to add your project</li>
                    </ul>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <p>Project Name:</p>
                        <input
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
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group text-right">
                        <Link to="/company/project">
                          <button className="btn btn-md btn-light mt-4 mr-3 mb-2">
                            Cancel
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-md btn-primary mt-4 mb-2"
                          onClick={this.submitProject}
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

export default ProjectAdd;
