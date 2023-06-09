import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import Input from "./Input";
import VideocamIcon from "@mui/icons-material/Videocam";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ userId }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const usr = useSelector((state) => state.user);
  const chatRoomName = `chat_${usr.id}_${userId}`; // Generate a unique chat room name

  const [localMessages, setLocalMessages] = useState([]);
  const [remoteMessages, setRemoteMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${chatRoomName}`);

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { message, username, is_local } = data;

      if (is_local) {
        setLocalMessages((prevMessages) => [
          ...prevMessages,
          { message, username },
        ]);
      } else {
        setRemoteMessages((prevMessages) => [
          ...prevMessages,
          { message, username },
        ]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, [chatRoomName]);

  // ...

  const handleSendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const data = {
        message,
        username: usr.username,
        is_local: true, // Set the flag to indicate the message is from the local user
      };
      socket.send(JSON.stringify(data));
      setMessage(""); // Clear the input field after sending the message
      setLocalMessages((prevMessages) => [
        ...prevMessages,
        { message, username: usr.username },
      ]);
    }
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>anu</span>
        <div className="chatIcons">
          <VideocamIcon
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/video_call/${userId}`)}
          />
          <GroupAddIcon />
          <MoreHorizIcon />
        </div>
      </div>
      <Messages localMessages={localMessages} remoteMessages={remoteMessages} />
      <Input
        handleSendMessage={handleSendMessage}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
};

export default Chat;
