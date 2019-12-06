import React, { Component } from "react";
import Footer from "../../components/Footer";
import { Redirect, Link } from "react-router-dom";
import Header from "../../components/Header";
import { axiosGet, axiosPut, axiosPatch } from "../../utils/API";

class ProfileCompEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr_data: {},
      name: "",
      location: "",
      description: "",
      data: {},
      redirect: false,
      selectedFile: null
    };
    this.updateCompany = this.updateCompany.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getData = url => {
    return axiosGet(url);
  };

  async componentDidMount() {
    const userName = localStorage.getItem('username')
    console.log(userName)
    const response = await this.getData("/company/user/"+userName);
    const res = response.data.result[0];    
    if (response.data) {
      console.log(res);
      // const arr_skill = res.map(i => ({ value: i.id_skill, label: i.name_skill }))
      this.setState({ arr_data: res });
      // console.log(this.state.data.name)
    }
  }

  async updateCompany() {
    try {
      const response = await axiosPut("/company/"+this.state.arr_data.id_company, {
        name: this.state.name || this.state.arr_data.name_company,
        location: this.state.location || this.state.arr_data.location,
        description: this.state.description || this.state.arr_data.description
      });
      console.log(this.state.name);
      console.log(this.state.location);
      console.log(this.state.description);
      // console.log(this.state.data.name_company)
      console.log("Returned data:", response.data);
      if (response.data) {
        if (response.data.result.changedRows === 1) {
          alert("Data updated!")
        } else {
          alert("Update failed!")
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  async fileUploadHandler() {
    try {
      const fd = new FormData();
      fd.append("logo", this.state.selectedFile);
      const response = await axiosPatch("/company/"+this.state.arr_data.id_company, fd);
      console.log(response.data);
      if (response.data.result.changedRows === 1) {
        alert("Logo updated!");
      } else {
        alert("Upload logo failed")
      }
    } catch (error) {
      console.log(error);
      alert("Upload error!")
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/company/profile"} />;
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
                      Edit Company{" "}
                    </h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <p>Company Name:</p>
                        <input
                          defaultValue={this.state.arr_data.name_company}
                          className="form-control"
                          type="text"
                          name="name"
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Location:</p>
                        <input
                          defaultValue={this.state.arr_data.location}
                          className="form-control"
                          type="text"
                          name="location"
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Description:</p>
                        <textarea
                          className="form-control"
                          name="description"
                          onChange={this.onChange}
                          defaultValue={this.state.arr_data.description}
                        ></textarea>
                      </div>

                      <div className="form-group p-t-15 text-right">
                        <Link to={"/company/profile/"+localStorage.getItem('username')}>
                          <button className="btn btn-md btn-light mr-3">
                            Cancel
                          </button>
                        </Link>
                        <input
                          type="button"
                          className="btn btn-md btn-primary"
                          value="Update"
                          onClick={this.updateCompany}
                        />
                      </div>
                    </form>
                    <hr />
                    <h1 className="card-title display-4 text-center mt-4">
                      Logo Company
                    </h1>
                    <div>
                      <div className="mb-4 mt-5 text-center">
                        <input
                          type="file"
                          onChange={this.fileSelectedHandler}
                        />
                        <button
                          className="btn btn-sm btn-primary ml-1"
                          onClick={this.fileUploadHandler}
                        >
                          Upload
                        </button>
                      </div>
                    </div>
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

export default ProfileCompEdit;
