import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import VideocamIcon from "@mui/icons-material/Videocam";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const navigate = useNavigate()
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>anu</span>
        <div className="chatIcons">
          <VideocamIcon sx={{cursor:"pointer"}} onClick={()=>navigate('/video_call')} />
          <GroupAddIcon />
          <MoreHorizIcon />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
