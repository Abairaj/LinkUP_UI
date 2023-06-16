import React, { useCallback, useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Divider, Stack, TextField } from "@mui/material";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import Messages from "./Messages";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../axosInstance";
import "./chat.scss";
import { useSocket } from "../../SocketProvider";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const room_name = user.id * id;
  const socket = useSocket();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef(null);

  const fetchMessages = () => {
    axiosInstance
      .get(`chats/message/${id}/${user.id}`)
      .then((response) => {
        console.log(response);
        response.data.map((obj) => {
          if (obj.sender === user.id) {
            console.log(obj.id, obj.content, "[[[[[[[[[[[[[");
            setMessages((prevMessages) => [
              ...prevMessages,
              { local: true, message: obj.content },
            ]);
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              { local: false, message: obj.content },
            ]);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // fetching user data for the chat receivers info
  const fetchUserData = () => {
    axiosInstance
      .get(`users/user_profile/${id}?filter='chat`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // sending call request to the backend
  const handleSubmit = useCallback(() => {
    navigate(`/video_call_web/${id}`);

    socket.send(
      JSON.stringify({
        event: "join:room",
        rec_user_id: id,
        sender_user_id: user.id,
        email: user.email,
      })
    );
  }, []);

  useEffect(() => {
    fetchUserData();
    fetchMessages();
    setMessages([]);
  }, [id]);

  useEffect(() => {
    socket.onopen = () => {
      console.log("socket connected");
    };
    return () => {};
  }, [socket]);

  // Listen for messages from remote user
  socket.onmessage = (event) => {
    const receivedMessage = JSON.parse(event.data).message;
    if (receivedMessage.event === "chatmessage") {
      console.log(receivedMessage, "////////////");
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          { local: false, message: receivedMessage.content },
        ];
      });
    }
  };

  // sending message to remote user
  const sendMessageHandler = (e) => {
    setMessages((prevMessages) => {
      return [...prevMessages, { local: true, message: message }];
    });
    e.preventDefault();
    socket.send(
      JSON.stringify({ event: "chat", message: message, from: user.id, to: id })
    );
    setMessage("");
  };

  useEffect(() => {
    // Scroll to the bottom of the message container
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat">
      <div className="pannel">
        <div className="user_info_head">
          <div className="user_bar">
            <div className="user_avatar">
              <Avatar src={users && users.profile} className="avatar" />
            </div>
            <div className="user_det">
              <p>{users && users.username}</p>
              {/* <span>active</span> */}
            </div>
          </div>

          <div className="head_icons">
            <VideoCallOutlinedIcon
              sx={{ fontSize: "30px" }}
              onClick={handleSubmit}
            />
          </div>
        </div>
        <div className="messagespace">
          <div className="message-container" ref={messageContainerRef}>
            {messages.map((msg, i) => (
              <React.Fragment key={i}>
                {/* {console.log(msg)} */}
                <Messages message={msg} />
              </React.Fragment>
            ))}
          </div>
        </div>
        <form action="submit">
          <div className="send_input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="send message..."
            />
            <button onClick={sendMessageHandler}>send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
