import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Loading from "../comp/Loading";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import Axios from "axios";
import DashItem from "./DashItem";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      profiles: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.user.type !== "admin") {
      this.props.getCurrentProfile();
    }

    //get all profiles
    if (this.props.auth.user.type === "admin") {
      Axios.get("/api/profile/all").then(res => {
        this.setState({ profiles: res.data });
      });
    }
  }

  //delete account handler
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    //get user
    const { user } = this.props.auth;
    //get profile
    const { profile, loading } = this.props.profile;
    //for admin dash
    const { profiles, search } = this.state;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Loading />;
    } else {
      //check if user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h3>
              Welcome,
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </h3>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div style={{ marginBottom: "75px" }}>
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                Delete Account
              </button>
            </div>
          </div>
        );
      } else {
        //has no profile
        dashboardContent = (
          <div>
            <h3>Welcome, {user.name}</h3>
            <p>Please create a Profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-success">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    //hide dashbaord Content if admin
    if (user.type === "admin") {
      dashboardContent = null;
    }

    let adminDash;
    //show admin dashboard
    if (user.type === "admin") {
      adminDash = profiles
        .filter(res => {
          if (
            res.user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            res.handle.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            res.user.email
              .toString()
              .toLowerCase()
              .indexOf(search.toString().toLowerCase()) !== -1
          ) {
            return res._id;
          }
        })
        .map(data => {
          return <DashItem key={data._id} profile={data} />;
        });
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {user.type === "admin" ? (
                <div className="form-group">
                  <input
                    id="searchFunc"
                    placeholder="Search..."
                    name="search"
                    value={this.state.search}
                    onChange={this.onChange}
                    className="form-control"
                  />
                  <label htmlFor="searchFunc">
                    <small>Search user by username or handle</small>
                  </label>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Handle</th>
                        <th>Email</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>{adminDash}</tbody>
                  </table>
                </div>
              ) : null}

              <div>{dashboardContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
