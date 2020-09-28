import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { deletePost, likePost, unlikePost } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.likePost(id);
  }

  onUnlikeClick(id) {
    this.props.unlikePost(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, options } = this.props;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header">
            <h4 className="float-left">{post.name}</h4>
          </div>

          <div className="card-body">
            <div className="row" />
            <div className="col-md-12">
              <p className="lead">{post.text}</p>

              {options ? (
                <span>
                  <div className="float-left">
                    {post.user === auth.user.id ||
                    auth.user.type === "admin" ? (
                      <button
                        onClick={this.onDeleteClick.bind(this, post._id)}
                        type="button"
                        className="btn btn-danger mr-1 float-right"
                      >
                        <i className="fas fa-times" />
                      </button>
                    ) : null}
                  </div>

                  <div className="float-right">
                    <button
                      onClick={this.onLikeClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-light mr-1"
                    >
                      <i
                        className={classnames("fas fa-thumbs-up", {
                          "text-info": this.findUserLike(post.likes)
                        })}
                      />
                      <span className="badge badge-light">
                        {post.likes.length}
                      </span>
                    </button>

                    <button
                      onClick={this.onUnlikeClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-light mr-1"
                    >
                      <i className="text-secondary fas fa-thumbs-down" />
                    </button>
                  </div>
                  <Link
                    to={`post/${post._id}`}
                    className="btn btn-success mr-1 float-left"
                  >
                    Chat
                  </Link>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  options: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likePost, unlikePost }
)(PostItem);
