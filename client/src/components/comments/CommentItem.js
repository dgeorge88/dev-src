import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/profileActions";

class CommentItem extends Component {
  onDeleteClick(profileId, commentId) {
    this.props.deleteComment(profileId, commentId);
  }

  render() {
    const { comment, profileId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <h5 className="text-center">{comment.name}:</h5>
          </div>
          <div className="col-md-10">
            <p className="text-left">{comment.text}</p>
            {comment.user === auth.user.id || auth.user.type === "admin" ? (
              <button
                onClick={this.onDeleteClick.bind(this, profileId, comment._id)}
                type="button"
                className="btn btn-danger mr-1 float-right"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  profileId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
