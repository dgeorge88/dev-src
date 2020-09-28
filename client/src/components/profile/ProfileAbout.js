import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //get users firstname
    const userName = profile.handle;

    //skill list array
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-2">
        <i className="fa fa-check pr-2" />
        {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="">About</h3>
          <hr />
          <div className="card-body mb-3">
            <h5 className="card-title">Bio</h5>

            <div className="card-text">
              {isEmpty(profile.bio) ? (
                <p>{userName} has not created a Bio</p>
              ) : (
                <p>{profile.bio}</p>
              )}
            </div>

            <hr />
            <h5 className="card-title">Skill Set</h5>
            <div className="card-text row">{skills}</div>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
