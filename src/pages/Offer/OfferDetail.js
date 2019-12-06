import React, { Component } from "react";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { axiosGet, axiosPost, axiosPatch } from "../../utils/API";
import Header from "../../components/Header";
import moment from "moment";
import queryString from "query-string";

class OfferDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj_proj: {},
      feebid: "",
      desc_nego: ""
    };
    this.bidding = this.bidding.bind(this);
    this.rejectProj = this.rejectProj.bind(this);
    this.acceptProj = this.acceptProj.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getData = url => {
    return axiosGet(url);
  };

  async componentDidMount() {
    const values = queryString.parse(this.props.location.search);

    let IdProj = values.idProj;
    let IdEng = values.idEng;
    const resProj = await this.getData(
      "/project/offer/?idProj=" + IdProj + "&idEng=" + IdEng
    );
    const dataProj = resProj.data.result[0];
    console.log(dataProj);

    if (dataProj) {
      this.setState({ obj_proj: dataProj });
      if (dataProj.sts_project_eng === "1") {
        this.myBtnReject.disabled = false;
        this.myBtnBidding.disabled = false;
        this.myBtnAccepted.disabled = false;
      } else {
        this.myBtnReject.disabled = true;
        this.myBtnBidding.disabled = true;
        this.myBtnAccepted.disabled = true;
      }
    }
  }

  async rejectProj() {
    try {
      const response = await axiosPatch("/project/sts/", {
        id_project_eng: this.state.obj_proj.id_project_eng,
        sts_project_eng: "0",
        date_accepted_eng: null
      });
      console.log("Returned data:", response.data);
      if (response.data.result.affectedRows === 1) {
        alert("Reject offer successful!");
        window.location.reload();
      } else {
        alert("Reject offer failed!");
      }
    } catch (e) {
      alert("Reject offer error!");
      console.log(`Axios request failed: ${e}`);
    }
  }

  async acceptProj() {
    try {
      const response = await axiosPatch("/project/sts/", {
        id_project_eng: this.state.obj_proj.id_project_eng,
        sts_project_eng: "2",
        date_accepted_eng: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      });
      console.log("Returned data:", response.data);
      if (response.data.result.affectedRows === 1) {
        alert("Accept offer successful!");
        window.location.reload();
      } else {
        alert("Accept offer failed!");
      }
    } catch (e) {
      alert("Reject offer error!");
      console.log(`Axios request failed: ${e}`);
    }
  }

  async bidding() {
    console.log(this.state.obj_proj.id_project_eng);
    try {
      const response = await axiosPost("/project/bid/", {
        id_project_eng: this.state.obj_proj.id_project_eng,
        fee_bid: this.state.feebid,
        desc_nego_proj: this.state.desc_nego
      });
      console.log("Returned data:", response.data);
      if (response.data.result.affectedRows === 1) {
        alert("Submit form successful!");
        window.location.reload();
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
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
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
        <section className="bg-gray200 pt-8 pb-2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7">
                <article className="card">
                  <img
                    className="card-img-top mb-2"
                    alt="offer view"
                    src="https://res.cloudinary.com/erdinsuharyadi/image/upload/v1575472959/hiringapp/assets/jumbotron-offer-header.png"
                  />
                  <div className="card-body">
                    <h1 className="card-title display-4 text-center">
                      Offer Project{" "}
                    </h1>
                    <ul>
                      <li>Details project from company for you</li>
                    </ul>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group mb-2">
                        <p>
                          Company:
                          <br /> <b>{this.state.obj_proj.name}</b>
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
                          Project Job:
                          <br /> <b>{this.state.obj_proj.project_job}</b>
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
                          Fee:
                          <br />{" "}
                          <b>
                            {this.formatRupiah(this.state.obj_proj.fee, "Rp")}
                          </b>
                        </p>
                      </div>
                      <div className="form-group">
                        <p className="mb-2">
                          Offer Date:
                          <br />{" "}
                          <b>
                            {moment
                              .utc(this.state.obj_proj.createProjEng)
                              .format("LLLL")}
                          </b>
                        </p>
                      </div>
                      <div className="form-group">
                        <p className="mb-2">
                          Status:
                          <br />{" "}
                          {this.state.obj_proj.sts_project_eng === "1" ? (
                            <span className="badge badge-pill badge-warning">
                              Waiting for Confirmation
                            </span>
                          ) : this.state.obj_proj.sts_project_eng === "2" ? (
                            <span className="badge badge-pill badge-success">
                              Accepted
                            </span>
                          ) : this.state.obj_proj.sts_project_eng === "0" ? (
                            <span className="badge badge-pill badge-danger">
                              Decline
                            </span>
                          ) : this.state.obj_proj.sts_project_eng === "3" ? (
                            <span className="badge badge-pill badge-info">
                              Negotiation
                            </span>
                          ) : (
                            <span className="badge badge-pill badge-light">
                              -
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="form-group">
                        <p className="mb-1">
                          Project Goal: 
                          <br/>
                          {this.state.obj_proj.progressEng === '1' ? <span className="badge badge-pill badge-success">Success</span> : (this.state.obj_proj.progressEng === '0' ? <span className="badge badge-pill badge-danger">Failed</span> : " -")} 
                        </p>
                      </div>

                      <hr />

                      <div className="form-group p-t-15 text-center">
                        <Link to="/offer/">
                          <button className="btn btn-md btn-light mr-3 mb-2">
                            Back
                          </button>
                        </Link>
                        <input
                          type="button"
                          className="btn btn-md btn-danger mr-3 mb-2"
                          value="Reject"
                          onClick={this.rejectProj}
                          ref={button => (this.myBtnReject = button)}
                        />
                        <button
                          type="button"
                          className="btn btn-md btn-secondary mr-3 mb-2"
                          data-toggle="modal"
                          data-target="#modalBiddingFee"
                          ref={button => (this.myBtnBidding = button)}
                        >
                          Bidding
                        </button>
                        <input
                          type="button"
                          className="btn btn-md btn-success mr-2 mb-2"
                          value="Accept"
                          onClick={this.acceptProj}
                          ref={button => (this.myBtnAccepted = button)}
                        />
                      </div>
                      <br />
                      <div>
                        <div
                          className="modal fade"
                          id="modalBiddingFee"
                          tabIndex={-1}
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-sm"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  Negotiation Fee Project
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="form-group">
                                  <p>Fee Bid:</p>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="feebid"
                                    autoComplete="off"
                                    placeholder="Bidding fee"
                                    required
                                    onChange={this.onChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <p>Description:</p>
                                  <textarea
                                    className="form-control"
                                    autoComplete="off"
                                    name="desc_nego"
                                    placeholder="Description bidding fee"
                                    onChange={this.onChange}
                                  ></textarea>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-light"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={this.bidding}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default OfferDetail;
