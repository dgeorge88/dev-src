import React, { Component } from "react";
import Moment from "react-moment";

class ProfileExp extends Component {
  render() {
    const { experience } = this.props;

    //Experience
    const expItems = experience.map(exp => (
      <div key={exp._id}>
        <h5 className="card-title">
          {exp.title} @ {exp.company}
        </h5>

        <h6 className="card-subtitle text-capitalize">
          {exp.location === "" ? null : <strong>{exp.location}</strong>}
        </h6>

        <p className="card-text">
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
          {exp.to === null ? (
            "Current"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </p>

        <p className="card-text">
          {exp.description === "" ? null : <span>{exp.description}</span>}
        </p>
        <hr />
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="">Experience</h3>
          <hr />
          <div className="card-body mb-3">
            {expItems.length > 0 ? (
              <div>{expItems}</div>
            ) : (
              <p>No Experience Listed</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileExp;
