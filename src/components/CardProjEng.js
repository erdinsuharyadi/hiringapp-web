import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { axiosGet, axiosPatch } from "../utils/API";
import moment from "moment";

class CardProjEng extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idbid: this.props.id_bid,
      idProjEng: this.props.id_project_eng,
      sts_project: this.props.sts_project_eng,
      btnNego: true,
      btnAction: true,
      arr_ProjEng: [],
      obj_projbid: {}
    };
    this.biddingAccept = this.biddingAccept.bind(this)
    this.biddingDecline = this.biddingDecline.bind(this)
    this.stsProjFailed = this.stsProjFailed.bind(this)
    this.stsProjSuccess = this.stsProjSuccess.bind(this)
  }

  getData = url => {
    return axiosGet(url);
  };

  async componentDidMount() {
    var IdBid = this.state.idbid;
   
    if (IdBid) {
      const resProjBid = await this.getData("/project/bid/" + IdBid);
      const dataProjBid = resProjBid.data.result[0];
      console.log(dataProjBid);
      if (dataProjBid) {
        this.setState({ obj_projbid: dataProjBid });
        if (this.state.sts_project === '3') {
          this.myBtnNego.disabled = false;
          this.myBtnAction.disabled = true;
        } else if (this.state.sts_project === '2') {
          this.myBtnNego.disabled = true;
          this.myBtnAction.disabled = false;
        } else if(this.state.sts_project === '1') {
          this.myBtnNego.disabled = false;
          this.myBtnAction.disabled = true;
        }
        else {
          this.myBtnNego.disabled = this.state.btnNego;
          this.myBtnAction.disabled = this.state.btnAction;
        }
      }
    } else {
      this.myBtnNego.disabled = this.state.btnNego;
     
    }
    
  }


  async biddingAccept() {
    try {
      const response = await axiosPatch("/project/bid/", {
        id_bid: this.state.idbid,
        sts_nego_proj: '2'
      });
      console.log("Returned data:", response.data);
      if (response.data.result.changedRows === 1) {
        alert("Accept negotiation successful!");
        window.location.reload();
        this.setState({ btnNego: true });
      } else {
        alert("Accept negotiation failed!");
        window.location.reload();
      }
    } catch (e) {
      alert("Update error!");
      console.log(`Axios request failed: ${e}`);
    }
  }

  async biddingDecline() {
    try {
      const response = await axiosPatch("/project/bid/", {
        id_bid: this.state.idbid,
        sts_nego_proj: '0'
      });
      console.log("Returned data:", response.data);
      if (response.data.result.changedRows === 1) {
        alert("Decline negotiation successful!");
        window.location.reload();
        this.setState({ btnNego: true });
      } else {
        alert("Decline negotiation failed!");
        window.location.reload();
      }
    } catch (e) {
      alert("Update error!");
      console.log(`Axios request failed: ${e}`);
    }
  }


  async stsProjFailed() {
    console.log(this.state.idProjEng)
    try {
      const response = await axiosPatch("/project/prog/", {
        id_project_eng: this.state.idProjEng,
        progress: '0',
      });
      console.log("Returned data:", response.data.result);
      if (response.data.result.changedRows === 1) {
        alert("Failed progress successful!");
        window.location.reload();
        this.setState({ btnAction: true });
      } else {
        alert("Update progress failed!");
        window.location.reload();
      }
    } catch (e) {
      alert("Update error!");
      console.log(`Axios request failed: ${e}`);
    }
  }


  async stsProjSuccess() {
    console.log(this.state.idProjEng)
    try {
      const response = await axiosPatch("/project/prog/", {
        id_project_eng: this.state.idProjEng,
        progress: '1',
      });
      console.log("Returned data:", response.data.result);
      if (response.data.result.changedRows === 1) {
        alert("Progress successful!");
        window.location.reload();
        this.setState({ btnAction: true });
      } else {
        alert("Update progress failed!");
        window.location.reload();
      }
    } catch (e) {
      alert("Update progress error!");
      console.log(`Axios request failed: ${e}`);
    }
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
      <div className="card bg-light mb-3 p-2 shadow-sm rounded">
        <div className="card-header">{this.props.datepost}</div>
        <div className="card-body">
          <div>
            <h6 className="card-title  ">{this.props.nameengineer}</h6>
            <p className="card-text ">
              {this.props.projectjob} <br />
              {this.props.fee}
            </p>
            <p className="card-text ">
              Date Accepted: {moment
                              .utc(this.props.dateaccepted)
                              .format("LLLL")}
            </p>
          </div>
          <hr />
          {this.props.sts_project_eng === "1" ? (
            <span className="badge badge-pill badge-warning">
              Waiting for Confirmation
            </span>
          ) : this.props.sts_project_eng === "2" ? (
            <span className="badge badge-pill badge-success">Accepted</span>
          ) : this.props.sts_project_eng === "0" ? (
            <span className="badge badge-pill badge-danger">Decline</span>
          ) : this.props.sts_project_eng === "3" ? (
            <span className="badge badge-pill badge-info">Negotiation</span>
          ) : (
            <span className="badge badge-pill badge-light">-</span>
          )}
          <div className="form-group p-t-15 text-right">
            <input
              type="button"
              className="btn btn-sm btn-secondary mr-2 mb-1"
              value="Negotiation"
              data-toggle="modal"
              data-target={"#modalBiddingFee" + this.props.id_project_eng}
              ref={button => (this.myBtnNego = button)}
            />
            <input
              type="button"
              className="btn btn-sm btn-success mr-2 mb-1"
              value="Action"
              data-toggle="modal"
              data-target={"#modalAction" + this.props.id_project_eng}
              ref={button => (this.myBtnAction = button)}
            />
          </div>
         
          <div>
            <div
              className="modal fade"
              id={"modalBiddingFee" + this.props.id_project_eng}
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
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
                      <p>
                        Fee Bid:
                        <br />
                        <b>{this.formatRupiah(this.state.obj_projbid.fee_bid, "Rp")}</b>
                      </p>
                    </div>
                    <div className="form-group">
                      <p>
                        Description:
                        <br />
                        <b>{this.state.obj_projbid.desc_nego_proj}</b>
                      </p>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-sm btn-light"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={this.biddingDecline}
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-success"
                      onClick={this.biddingAccept}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              className="modal fade"
              id={"modalAction" + this.props.id_project_eng}
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Progress Project
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
                    <p>Progress project?

                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-sm btn-light"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={this.stsProjFailed}
                    >
                      Failed
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-success"
                      onClick={this.stsProjSuccess}
                    >
                      Success
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CardProjEng.defaultProps = {
  companyname: "Company Name",
  datepost: "00/00/0000",
  nameengineer: "Name Engineer",
  projectjob: "Project Job Engineer",
  idproject: "1",
  fee: "-",
  dateaccepted: " -",
  id_project_eng: 0,
  id_bid: 0
};

export default CardProjEng;
