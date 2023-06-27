import React from "react";

const Messages = ({ message }) => {
  function convertToTimeOnly(dateTime) {
    var time = new Date(dateTime);
    var hours = time.getHours();
    var minutes = time.getMinutes();

    // Add leading zeros if necessary
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes;
  }
  const localMessageStyle = {
    margin: "20px",
    backgroundColor: "#2979ff",
    color: "#E8F6EF",
    maxWidth: "fit-content",
    padding: "10px 15px",
    borderRadius: "32px",
    alignSelf: "flex-end",
  };

  const remoteMessageStyle = {
    margin: "20px",
    borderRadius: "32px",
    backgroundColor: "#dadada",
    maxWidth: "fit-content",
    padding: "10px 15px",
    alignSelf: "flex-start",
  };

  const localMessageStyle2 = {
    margin: "20px",
    color: "#E8F6EF",
    maxWidth: "fit-content",
    // padding: "10px 15px",
    borderRadius: "32px",
    alignSelf: "flex-end",
    display:'flex'
  };

  const remoteMessageStyle2 = {
    margin: "20px",
    borderRadius: "32px",
    maxWidth: "fit-content",
    // padding: "10px 15px",
    alignSelf: "flex-start",
    display:'flex'
  };

  return (
    <div
      className="message_box"
      style={message.local ? localMessageStyle2 : remoteMessageStyle2}
    >
      <div style={message.local ? localMessageStyle : remoteMessageStyle}>
        {message.message}
      </div>
      <div className="time">
        <p style={{ margin: 0,color:'black',textAlign:'end' }}>{convertToTimeOnly(message.created_at)}</p>
      </div>
    </div>
  );
};

export default Messages;
