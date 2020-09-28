import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatItem from "./ChatItem";

class ChatContent extends Component {
  render() {
    const { chats, postId } = this.props;

    return chats.map(chat => (
      <ChatItem key={chat._id} chat={chat} postId={postId} />
    ));
  }
}

ChatContent.propTypes = {
  chats: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default ChatContent;
