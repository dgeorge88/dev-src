import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteAccountById } from "../../actions/profileActions";

class DashItem extends Component {
  //delete account
  onDeleteClick(id) {
    this.props.deleteAccountById(id);
    window.location.reload();
  }

  render() {
    const { profile, auth } = this.props;

    return (
      <tr>
        <th>
          <Link to={`/profile/${profile.handle}`}>{profile.user.name}</Link>
        </th>
        <td>{profile.handle} </td>
        <td>{profile.user.email}</td>
        <td>
          {auth.user.type === "admin" ? (
            <button
              onClick={this.onDeleteClick.bind(this, profile._id)}
              type="button"
              className="btn btn-danger mr-1 "
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
        </td>
      </tr>
    );
  }
}

DashItem.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteAccountById }
)(DashItem);
