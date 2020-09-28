import React, { Component } from "react";
import Loading from "../comp/Loading";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import classnames from "classnames";

import {
  getProfileByHandle,
  addProfileLike,
  removeProfileLike
} from "../../actions/profileActions";

//componenets
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import ProfileEdu from "./ProfileEdu";
import ProfileExp from "./ProfileExp";

//comments
import CommentFeed from "../comments/CommentFeed";
import CommentForm from "../comments/CommentForm";

//import Posts from "../posts/Posts";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  //like handler
  onLikeClick(id) {
    this.props.addProfileLike(id);
  }
  //unlike handler
  onUnlikeClick(id) {
    this.props.removeProfileLike(id);
  }
  //find if user has already liked
  findUserLike(likes) {
    const { auth } = this.props;
    const { profile } = this.props.profile;

    if (profile.likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    //get profile
    const { profile, loading } = this.props.profile;
    //profile content variable
    let profileContent;

    //load profile content or display loading.gif
    if (profile === null || loading) {
      profileContent = <Loading />;
    } else {
      profileContent = (
        <div className="container">
          <div className="row">
            <div className="col">
              <Link to="/profiles" className="btn btn-light mb-3">
                <i className="fas fa-chevron-left" /> Back
              </Link>
            </div>

            <div className="col">
              <button
                onClick={this.onUnlikeClick.bind(this, profile._id)}
                type="button"
                className="btn btn-light mr-1 float-right"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>

              <button
                onClick={this.onLikeClick.bind(this, profile._id)}
                type="button"
                className="btn btn-light mr-1 float-right"
              >
                <i
                  className={classnames("fas fa-thumbs-up", {
                    "text-info": this.findUserLike(profile.likes)
                  })}
                />
                <span className="badge badge-light">
                  {profile.likes.length}
                </span>
              </button>
            </div>
          </div>
          <br />
          <div>
            <ProfileHeader profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExp experience={profile.experience} />
            <ProfileEdu education={profile.education} />
          </div>

          <div>
            <CommentForm profileId={profile._id} />
            <CommentFeed profileId={profile._id} comments={profile.comments} />
          </div>
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  addProfileLike: PropTypes.func.isRequired,
  removeProfileLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getProfileByHandle, addProfileLike, removeProfileLike }
)(Profile);
