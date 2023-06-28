import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import Messages from "./Messages";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../axosInstance";
import "./chat.scss";
import { useSocket } from "../../SocketProvider";
import SendIcon from "@mui/icons-material/Send";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

const Chat = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const room_name = user.id * id;
  const socket = useSocket();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [messages]);

  // Scroll to the bottom when the component first opens
  useEffect(() => {
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, []);

  const fetchMessages = () => {
    axiosInstance
      .get(`chats/message/${id}/${user.id}`)
      .then((response) => {
        console.log(response);
        response.data.map((obj) => {
          if (obj.sender === user.id) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { local: true, message: obj.content, created_at: obj.created_at },
            ]);
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                local: false,
                message: obj.content,
                created_at: obj.created_at,
              },
            ]);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // fetching user data for the chat recievers info
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

    socket.send(
      JSON.stringify({
        event: "notification",
        from: user.id,
        to: id,
        content: `You have a message from ${user.username}`,
        type: "message",
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

  // Listen for messages from remote uder
  socket.onmessage = (event) => {
    const recievedMessage = JSON.parse(event.data).message;
    if (recievedMessage.event === "chatmessage") {
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            local: false,
            message: recievedMessage.content,
            created_at: Date.now(),
          },
        ];
      });
    }
  };

  // sendig message to remote user
  const sendMessageHandler = (e) => {
    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        { local: true, message: message, created_at: Date.now() },
      ];
    });
    e.preventDefault();
    socket.send(
      JSON.stringify({ event: "chat", message: message, from: user.id, to: id })
    );
    setMessage("");
  };

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
        <div className="messagespace" ref={messageRef}>
          {messages.map((msg, i) => (
            <React.Fragment key={i}>
              <Messages message={msg} />
            </React.Fragment>
          ))}
        </div>
        <form action="submit">
          <div className="send_input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="send message..."
            />
            <button onClick={sendMessageHandler}>
              <SendIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
