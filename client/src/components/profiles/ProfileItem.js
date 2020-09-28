import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <tr>
        <th>
          <Link to={`/profile/${profile.handle}`}>{profile.handle}</Link>
        </th>
        <td>
          {isEmpty(profile.company) ? null : <span>{profile.company}</span>}
        </td>
        <td>{profile.skilllvl}</td>

        <td>{profile.location}</td>
        <td>
          {profile.skills.slice(0, 4).map((skill, index) => (
            <ul key={index} className="list-group">
              <li>{skill}</li>
            </ul>
          ))}
        </td>
      </tr>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
