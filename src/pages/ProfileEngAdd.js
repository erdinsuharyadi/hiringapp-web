import React, { Component } from 'react'
import Footer from '../components/Footer'
import Select from 'react-select';
import { axiosGet, axiosPost } from '../utils/API'
import Header from '../components/Header';

class ProfileEngAdd extends Component {

  constructor(props) {
    super(props)
    this.state = {
      skills: [''],
      name_eng: '',
      dob: '',
      location: '',
      no_hp: '',
      job: '',
      showcase: '',
      selectedOptions: [],
    }
    this.addprofile = this.addprofile.bind(this)
    this.onChange = this.onChange.bind(this)
  }


  getData = (url) => {
    return axiosGet(url)
  }

  async componentDidMount() {
    const response = await this.getData('/skill/');
    const res = response.data.result
    if (response.data) {
      const arr_skill = res.map(i => ({ value: i.id_skill, label: i.name_skill }))
      this.setState({ skills: arr_skill })
    }
  }

  async addprofile() {
    try {
      const response = await axiosPost('http://3.82.228.249:2000/engineer/', {
        name_eng: this.state.name_eng,
        dob: this.state.dob,
        location: this.state.location,
        no_hp: this.state.no_hp,
        job: this.state.job,
        showcase: this.state.showcase,
      });
      const arrSelSkill = this.state.selectedOptions
      for (let i = 0; i < arrSelSkill.length; i++) {
        const idSkill = arrSelSkill[i].value
        await axiosPost('http://3.82.228.249:2000/engskill/', {
          id_eng: response.data.result.insertId,
          id_skill: idSkill
        });
      }
      console.log('Returned data:', response.data);
      // if(response.data) {
      //   // localStorage.setItem("tokens", JSON.stringify(response.data));
      //   // setAuthTokens(data);
      //   alert("Register Success!")
      //   // this.setState({redirect: true})
      // }
    } catch (e) {
      console.log(e);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
  }


  render() {
    const { selectedOption } = this.state;

    return (
      <div>
      <Header/>
      <section className="bg-gray200 pt-8 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <article className="card">

                <div className="card-body">
                  <h1 className="card-title display-4 text-center">
                    Edit Profile </h1>
                  <hr />

                  

                  <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                      <p>Full Name:</p>
                      <input className="form-control" type="text" name="name_eng" autoComplete="off" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                      <p>Date of Birth:</p>
                      <input className="form-control" type="date" name="dob" autoComplete="off" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                      <p>Location:</p>
                      <input className="form-control" type="text" name="location" autoComplete="off" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                      <p>Telephone:</p>
                      <input className="form-control" type="text" name="no_hp" autoComplete="off" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                      <p>Job:</p>
                      <input className="form-control" type="text" name="job" autoComplete="off" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                      <p>Link Showcase:</p>
                      <input className="form-control" type="text" name="showcase" autoComplete="off" onChange={this.onChange} />
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
                    <div className="form-group p-t-15">
                      <button className="btn btn-md btn-light mr-3">Cancel</button>
                      <input type="submit" className="btn btn-md btn-primary" value="Submit" onClick={this.addprofile} />
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
    )
  }
}

export default ProfileEngAdd
