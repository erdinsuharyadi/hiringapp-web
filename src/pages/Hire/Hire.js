import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";
import { axiosGet, axiosPost } from "../../utils/API";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Select from "react-select";

class Hire extends Component {
  constructor(props) {
    super(props);
    let idEng = this.props.match.params.idEngineer;
    this.state = {
      arr_project: [""],
      id_project: 1,
      id_eng: idEng,
      fee: "",
      project_job: "",
      redirect: false,
      selectedOptions: [],
      backDtl: "/detail/"+idEng,

    };
    this.hire = this.hire.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getData = url => {
    return axiosGet(url);
  };

  async componentDidMount() {
    const response = await this.getData("/project/");
    const res = response.data.result;
    if (response.data) {
      const arr_pro = res.map(i => ({
        value: i.id_project,
        label: i.project_name
      }));
      this.setState({ arr_project: arr_pro });
    }
  }

  async hire() {
    try {
      const response = await axiosPost("/hire/", {
        id_project: this.state.selectedOptions.value,
        id_eng: this.state.id_eng,
        fee: this.state.fee,
        project_job: this.state.project_job
      });
      console.log("Returned data:", response.data);
      if (response.data.result.affectedRows === 1) {
        alert("Submit form successful!");
        this.setState({ redirect: true });
      } else {
        alert("Submit form failed!");
      }
      // if(response.data) {
      //   // localStorage.setItem("tokens", JSON.stringify(response.data));
      //   // setAuthTokens(data);
      //   alert("Register Success!")
      //   // this.setState({redirect: true})
      // }
    } catch (e) {
      alert("Submit form error!");
      console.log(`Axios request failed: ${e}`);
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }

  handleChange = selectedOptions => {
    this.setState({ selectedOptions });
  };

  async handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { selectedOption } = this.state;

    if (this.state.redirect) {
      return <Redirect to={"/home"} />;
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
                    src="https://res.cloudinary.com/erdinsuharyadi/image/upload/v1575001317/hiringapp/assets/hireheader.png"
                  />
                  <div className="card-body">
                    <h1 className="card-title display-4 text-center">Hire Form </h1>
                    <ul>
                      <li>Field this form to get software engineer</li>
                    </ul>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <p>Project Name:</p>
                        <Select
                          isClearable={this.state.arr_project.some(
                            v => !v.isFixed
                          )}
                          options={this.state.arr_project}
                          value={selectedOption}
                          isSearchable="true"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Project Job:</p>
                        <textarea
                          className="form-control"
                          name="project_job"
                          autoComplete="off"
                          onChange={this.onChange}
                          required
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <p>Fee:</p>
                        <input
                          className="form-control"
                          type="text"
                          name="fee"
                          autoComplete="off"
                          onChange={this.onChange}
                          required
                        />
                      </div>

                      <div className="form-group text-right">
                        <Link to={this.state.backDtl}>
                          <button className="btn btn-md btn-light  mt-4 mr-3">
                            Cancel
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-md btn-primary mt-4"
                          onClick={this.hire}
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

export default Hire;
