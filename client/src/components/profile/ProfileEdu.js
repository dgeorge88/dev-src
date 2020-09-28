import React, { Component } from "react";
import Moment from "react-moment";

class ProfileEdu extends Component {
  render() {
    const { education } = this.props;

    //Education
    const eduItems = education.map(edu => (
      <div key={edu._id}>
        <h5 className="card-title">
          {edu.degree} in {edu.course}
        </h5>

        <h6 className="card-subtitle text-capitalize">
          {edu.school}, {edu.location === "" ? null : <p>{edu.location}</p>}
        </h6>

        <p className="card-text">
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
          {edu.to === null ? (
            "Current"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </p>

        <p className="card-text">
          {edu.description === "" ? null : <span>{edu.description}</span>}
        </p>
        <hr />
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="">Education</h3>
          <hr />
          <div className="card-body mb-3">
            {eduItems.length > 0 ? (
              <div>{eduItems}</div>
            ) : (
              <p>No Education Listed</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdu;
