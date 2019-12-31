import React, { Component } from "react";
import Footer from "../../components/Footer";
import Select from "react-select";
import { Link } from "react-router-dom";
import { axiosGet, axiosPost, axiosPatch, axiosPut } from "../../utils/API";
import Header from "../../components/Header";
import moment from "moment";

class ProfileEngEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj_data_eng: {},
      skills: [""],
      name_eng: "",
      dob: "",
      location: "",
      no_hp: "",
      job: "",
      showcase: "",
      selectedOptions: [],
      selectedFile: null
    };
    this.updateEng = this.updateEng.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getData = url => {
    return axiosGet(url);
  };

  async componentDidMount() {
    const userName = localStorage.getItem('username')
    const resEng = await this.getData("/engineer/user/"+userName);
    const dataEng = resEng.data.result[0];
    const response = await this.getData("/skill/");
    const res = response.data.result;
    console.log(dataEng);
    this.setState({ obj_data_eng: dataEng });
    if (response.data) {
      const arr_skill = res.map(i => ({
        value: i.id_skill,
        label: i.name_skill
      }));
      this.setState({ skills: arr_skill });
    }
  }

  async updateEng() {
    console.log('skill', this.state.selectedOptions);
    
    try {
      const response = await axiosPut("/engineer/"+this.state.obj_data_eng.id_eng, {
        name_eng: this.state.name_eng,
        dob: this.state.dob,
        location: this.state.location,
        no_hp: this.state.no_hp,
        job: this.state.job,
        showcase: this.state.showcase
      });
      const arrSelSkill = this.state.selectedOptions;
      for (let i = 0; i < arrSelSkill.length; i++) {
        const idSkill = arrSelSkill[i].value;
        console.log(idSkill)
        await axiosPost("/engskill/", {
          id_eng: this.state.obj_data_eng.id_eng,
          id_skill: idSkill
        });
      }
      console.log("Returned data:", response.data);
      if (response.data) {
        // localStorage.setItem("tokens", JSON.stringify(response.data));
        // setAuthTokens(data);
        alert("Submit Success!");
        // this.setState({redirect: true})
      }
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange = selectedOptions => {
    this.setState({ selectedOptions });
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  async fileUploadHandler() {
    try {
      const fd = new FormData();
      fd.append("photo", this.state.selectedFile);
      const response = await axiosPatch("/engineer/"+this.state.obj_data_eng.id_eng, fd);
      console.log(response.data);
      if (response.data.result.changedRows === 1) {
        alert("Photo updated!");
      } else {
        alert("Upload photo failed");
      }
    } catch (error) {
      alert("Upload error!");
    }
  }

  render() {
    const { selectedOption } = this.state;

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
                      Edit Profile{" "}
                    </h1>
                    <hr />

                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <p>Full Name:</p>
                        <input
                          defaultValue={this.state.obj_data_eng.name_eng}
                          className="form-control"
                          type="text"
                          name="name_eng"
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Date of Birth:</p>
                        <input
                          className="form-control"
                          type="date"
                          name="dob"
                          defaultValue={moment
                            .utc(this.state.obj_data_eng.dob)
                            .format("YYYY-MM-DD")}
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Location:</p>
                        <input
                          defaultValue={this.state.obj_data_eng.location}
                          className="form-control"
                          type="text"
                          name="location"
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Telephone:</p>
                        <input
                          defaultValue={this.state.obj_data_eng.no_hp}
                          className="form-control"
                          type="text"
                          name="no_hp"
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Job:</p>
                        <input
                          defaultValue={this.state.obj_data_eng.job}
                          className="form-control"
                          type="text"
                          name="job"
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Link Showcase:</p>
                        <input
                          defaultValue={this.state.obj_data_eng.showcase}
                          className="form-control"
                          type="text"
                          name="showcase"
                          autoComplete="off"
                          onChange={this.onChange}
                        />
                      </div>

                      <div className="form-group">
                        <p>Skills:</p>
                        <Select
                          isClearable={this.state.skills.some(v => !v.isFixed)}
                          options={this.state.skills}
                          isMulti
                          value={selectedOption}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group p-t-15 text-right">
                        <Link to={"/engineer/profile/"+localStorage.getItem('username')}>
                          <button className="btn btn-md btn-light mr-3">
                            Cancel
                          </button>
                        </Link>
                        <input
                          type="submit"
                          className="btn btn-md btn-primary"
                          value="Submit"
                          onClick={this.updateEng}
                        />
                      </div>
                    </form>
                    <hr />
                    <h1 className="card-title display-4 text-center mt-4">
                      Update Photo Profile
                    </h1>
                    <div>
                      <div className="mb-4 text-center">
                        <input
                          // style={{ display: "none" }}
                          type="file"
                          onChange={this.fileSelectedHandler}
                          // ref={fileInput => (this.fileInput = fileInput)}
                        />
                        {/* <FaRegImage
                          onClick={() => this.fileInput.click()}
                          size={50}
                        /> */}
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

export default ProfileEngEdit;
