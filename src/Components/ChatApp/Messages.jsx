import React from "react";
import { convertToTimeOnly } from "../helpers";

const Messages = ({ message }) => {

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
    borderRadius: "32px",
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row-reverse" 
  };
  

  const remoteMessageStyle2 = {
    margin: "20px",
    borderRadius: "32px",
    maxWidth: "fit-content",
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
        <p style={{ margin: 0,color:'black',textAlign:'end',fontSize:'13px' }}>{convertToTimeOnly(message.created_at)}</p>
      </div>
    </div>
  );
};

export default Messages;
