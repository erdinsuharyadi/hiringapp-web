import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardProjEng extends Component {

  render() {
    return (
      <div className="card bg-light mb-3 p-2 shadow-sm rounded">
        <div className="card-header">
          {this.props.datepost}
        </div>
        <div className="card-body">
        <div>
          <h6 className="card-title  ">{this.props.nameengineer}</h6>
          <p className="card-text ">{this.props.projectjob} <br/>{this.props.fee}</p>
          <p className="card-text ">Date Accepted: {this.props.dateaccepted}</p>
        </div> 
        <hr/>
          {this.props.sts_project_eng === "1" ? (
            <span className="badge badge-pill badge-warning">Waiting for Confirmation</span>
          ) : this.props.sts_project_eng === "2" ? (
            <span className="badge badge-pill badge-success">Accepted</span>
          ) : this.props.sts_project_eng === "0" ? (
            <span className="badge badge-pill badge-danger">Rejected</span>
          ) : (
            <span className="badge badge-pill badge-light">-</span>
          )}
          <div className="form-group p-t-15 text-right">
          
          <input
            type="button"
            className="btn btn-sm btn-secondary mr-2 mb-2"
            value="Negotiation"
            onClick={this.rejectProj}
            ref={button => (this.myBtnReject = button)}
          />
          <input
            type="button"
            className="btn btn-sm btn-success mr-2 mb-2"
            value="Action"
            onClick={this.acceptProj}
            ref={button => (this.myBtnAccepted = button)}
          />
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
  dateaccepted: " -"
};

export default CardProjEng;
