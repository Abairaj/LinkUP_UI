import React, { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useSelector } from "react-redux";

const Message = ({ handleSendMessage, setMessage, message }) => {
  return (
    <div className="message-container">
      <MessageInput
        onSendMessage={handleSendMessage}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
};

const MessageInput = ({ onSendMessage, setMessage, message }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="send">
        <PermMediaIcon />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <AttachFileIcon />
        </label>
        <button type="submit" onClick={handleFormSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
