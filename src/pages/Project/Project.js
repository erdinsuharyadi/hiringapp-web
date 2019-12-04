import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { axiosPost } from "../../utils/API";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      description: "",
      period: "",
      deadline: "",
      redirect: false,
      students: [
        { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
        { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
        { id: 3, name: "Saad", age: 16, email: "saad@email.com" },
        { id: 4, name: "Asad", age: 25, email: "asad@email.com" }
      ]
    };
    this.submitProject = this.submitProject.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  renderTableData() {
    return this.state.students.map((student, index) => {
      const { id, name, age, email } = student; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{email}</td>
        </tr>
      );
    });
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
      alert("Submit form error!");
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
                    alt="header project list"
                    src="https://res.cloudinary.com/erdinsuharyadi/image/upload/v1575443009/hiringapp/assets/projectlistheader.png"
                  />
                  <div className="card-body">
                    <h1 className="card-title display-4 text-center">
                      List Project
                    </h1>
                    <hr />

                    <div>
                      <h1 id="title">React Dynamic Table</h1>
                      <table className="table" id="students">
                        <tbody>{this.renderTableData()}</tbody>
                      </table>
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

export default Project;
