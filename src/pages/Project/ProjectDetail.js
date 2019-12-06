import React, { Component } from "react";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { axiosGet } from "../../utils/API";
import Header from "../../components/Header";
import moment from "moment";
import CardProjEng from "../../components/CardProjEng";
const axios = require('axios')

class OfferDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr_ProjEng: [],
      obj_proj: {},
      feebid: "",
      desc_nego: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  getData = url => {
    return axiosGet(url);
  };

  async componentDidMount() {
    let IdProj = this.props.match.params.idProj;
    const resProj = await this.getData("/project/id/" + IdProj);
    const dataProj = resProj.data.result[0];
    console.log(dataProj);
    if (dataProj) {
      this.setState({ obj_proj: dataProj });
    }

    const resProjEng = await this.getData("/project/eng/" + IdProj);
    let dtProjEng = resProjEng.data.result;
    if (resProjEng.data.status === 200) {
      console.log(dtProjEng);
      this.setState({ arr_ProjEng: dtProjEng });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  deleteProj() {
    axios.delete("http://localhost:4000/project/"+this.props.match.params.idProj);
  }

  formatRupiah(fee, prefix) {
    const str = "";
    const number = str.concat(fee);
    var number_string = number.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  render() {
    return (
      <div>
        <Header />
        <section className="bg-gray200 pt-8 pb-2 ">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7">
                <article className="card mb-3">
                  <img
                    className="card-img-top mb-2"
                    alt="offer view"
                    src="https://res.cloudinary.com/erdinsuharyadi/image/upload/v1575472959/hiringapp/assets/jumbotron-offer-header.png"
                  />
                  <div className="card-body">
                    <h1 className="card-title display-4 text-center">
                      Detail Project{" "}
                    </h1>
                    <ul>
                      <li></li>
                    </ul>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group mb-2">
                        <p>
                          Company:
                          <br /> <b>{this.state.obj_proj.name_company}</b>
                        </p>
                      </div>
                      <div className="form-group">
                        <p className="mb-2">
                          Project Name:
                          <br /> <b>{this.state.obj_proj.project_name}</b>
                        </p>
                      </div>
                      <div className="form-group">
                        <p className="mb-2">
                          Project Description:
                          <br /> <b>{this.state.obj_proj.description}</b>
                        </p>
                      </div>
                      <div className="form-group">
                        <p className="mb-2">
                          Period:
                          <br /> <b>{this.state.obj_proj.period}</b>
                        </p>
                      </div>
                      <div className="form-group">
                        <p className="mb-2">
                          Estimated Deadline:
                          <br />{" "}
                          <b>
                            {moment
                              .utc(this.state.obj_proj.deadline)
                              .format("DD MMMM YYYY")}
                          </b>
                        </p>
                      </div>
                      <div className="form-group">
                        <p className="mb-2">
                          Created Date:
                          <br />{" "}
                          <b>
                            {moment
                              .utc(this.state.obj_proj.createProjEng)
                              .format("LLLL")}
                          </b>
                        </p>
                      </div>
                      <hr />

                      <div className="form-group p-t-15 text-right">
                        <Link to="/company/project">
                          <button className="btn btn-md btn-light mr-3 mb-2">
                            Back
                          </button>
                        </Link>
                        <input
                          type="button"
                          className="btn btn-md btn-danger mr-3 mb-2"
                          value="Delete"
                          onClick={this.deleteProj}
                          ref={button => (this.myBtnDelete = button)}
                        />
                        <Link to={"/company/project/edit/"+this.props.match.params.idProj}>
                          <input
                            type="button"
                            className="btn btn-md btn-warning mr-2 mb-2"
                            value="Edit"
                            ref={button => (this.myBtnEdit = button)}
                          />
                        </Link>
                      </div>
                    </form>
                  </div>
                </article>

                
                  {this.state.arr_ProjEng.map((val, idx) => (
                    <CardProjEng
                      key={idx}
                      datepost={moment.utc(val.createProjEng).format("LLLL")}
                      nameengineer={val.name_eng}
                      projectjob={val.project_job}
                      idproject={val.id_project}
                      sts_project_eng={val.sts_project_eng}
                      fee={this.formatRupiah(val.fee, "Rp")}
                      dateaccepted={val.date_accepted_eng}
                      id_project_eng={val.id_project_eng}
                      id_bid={val.id_bid}
                      progress={val.progress}
                      
                    />
                  ))}
                
              </div>
            </div>
            <Footer />
          </div>
        </section>
      </div>
    );
  }
}

export default OfferDetail;
