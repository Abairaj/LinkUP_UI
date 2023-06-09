import React from "react";
import ChatNavbar from "./ChatNavbar";
import ChatSearch from "./ChatSearch";
import Chats from "./Chats";

const ChatSidebar = ({usr}) => {
  return (
    <div className="chatSidebar">
      <ChatNavbar />
      <ChatSearch/>
      <Chats/>
    </div>
  );
};

export default ChatSidebar;
