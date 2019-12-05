import React, { Component } from "react";
// import { FaArrowAltCircleRight, FaCheckCircle, FaStar } from 'react-icons/fa'
import { Link } from "react-router-dom";

class CardOffer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="card bg-light mb-3 p-2 shadow-sm rounded">
        <div className="card-header">
          <strong>{this.props.companyname}</strong> - {this.props.datepost}
        </div>
        <div className="card-body">
          <h6 className="card-title">{this.props.projectname}</h6>
          <p className="card-text">{this.props.projectdesc}</p>
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
          <Link
            to={"/offer/view/" + this.props.idproject}
            className="btn btn-sm btn-primary float-right"
          >
            View Detail
          </Link>
        </div>
      </div>
    );
  }
}

CardOffer.defaultProps = {
  companyname: "Company Name",
  datepost: "00/00/0000",
  projectname: "Project Name",
  projectdesc: "Project Desciption",
  idproject: "1"
};

export default CardOffer;
