import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, profileId } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} profileId={profileId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  profileId: PropTypes.string.isRequired
};

export default CommentFeed;
