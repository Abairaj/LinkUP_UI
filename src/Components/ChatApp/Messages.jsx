import React from "react";

const Messages = ({ message }) => {
  const localMessageStyle = {
    margin: "20px",
    backgroundColor: "#2979ff",
    maxWidth: "fit-content", // Adjust the maximum width as per your preference
    padding: "10px 15px",
    borderRadius: "32px",
    alignSelf: "flex-end",
  };

  const remoteMessageStyle = {
    margin: "20px",
    borderRadius: "32px",
    backgroundColor: "#dadada",
    maxWidth: "fit-content", // Adjust the maximum width as per your preference
    padding: "10px 15px",
    alignSelf: "flex-start",
  };

  return (
    <div
      className="message_box"
      style={message.local ? localMessageStyle : remoteMessageStyle}
    >
      {message.message}
    </div>
  );
};

export default Messages;
