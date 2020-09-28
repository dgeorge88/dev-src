import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loading from "../comp/Loading";
import ChatForm from "./ChatForm";

import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import ChatContent from "./ChatContent";
import PostItem from "../posts/PostItem";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Loading />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} options={false} />
          <ChatForm postId={post._id} />
          <ChatContent postId={post._id} chats={post.chats} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/posts" className="btn btn-light mb-3">
                <i className="fas fa-chevron-left" /> Back
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  post: state.post
});

export default connect(
  mapStatetoProps,
  { getPost }
)(Post);
