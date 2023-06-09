import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message,isOwner }) => {
  const usr = useSelector((state) => state.user);
  return (
    <div className={`message ${isOwner ? 'owner' : ''}`}>      <div className="messageInfo">
        <img src={usr.profile} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent"></div>
      <p>{message.message}</p>
      <img src="" alt="" />
    </div>
  );
};

export default Message;
