import React from "react";
import Message from "./Message";

const Messages = ({ localMessages, remoteMessages }) => {
  return (
    <div className="messages">
      {localMessages && localMessages.length > 0 ? (
        localMessages.map((message) => (
          <Message isOwner={true} message={message} />
        ))
      ) : (
        <div>No local messages</div>
      )}

      {remoteMessages && remoteMessages.length > 0 ? (
        remoteMessages.map((message) => (
          <Message isOwner={false} message={message} />
        ))
      ) : (
        <div>No remote messages</div>
      )}
    </div>
  );
};

export default Messages;
