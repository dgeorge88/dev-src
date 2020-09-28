import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteChat } from "../../actions/postActions";

class ChatItem extends Component {
  onDeleteClick(postId, chatId) {
    this.props.deleteChat(postId, chatId);
  }

  render() {
    const { chat, postId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <h5 className="text-center ">{chat.name}:</h5>
          </div>
          <div className="col-md-10">
            <p className="text-left">{chat.text}</p>
            {chat.user === auth.user.id || auth.user.type === "admin" ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, chat._id)}
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

ChatItem.propTypes = {
  deleteChat: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteChat }
)(ChatItem);
