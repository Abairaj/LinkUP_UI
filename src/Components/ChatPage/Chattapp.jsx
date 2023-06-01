import React from "react";
import ChatSidebar from "./ChatSidebar";
import Chat from "./Chat";
import './chatStyles.scss';

const Chattapp = () => {
  return (
    <div className="chatapp">
      <div className="container">
        <ChatSidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Chattapp;
