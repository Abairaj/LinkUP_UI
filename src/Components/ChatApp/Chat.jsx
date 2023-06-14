import React, { useCallback, useEffect, useState } from "react";
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
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

const Chat = () => {
  const user = useSelector((state) => state.user);
  const [users,setUsers] = useState();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const room_name = user.id * id;
  const socket = useSocket();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");


  // fetching user data for the chat recievers info
  const fetchUserData = () => {
    axiosInstance
      .get(`users/user_profile/${id}`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // sending call request to the backend
  const handleSubmit = useCallback(() => {
    navigate(`/video_call_web/${id}`)

    socket.send(
      JSON.stringify({event:'join:room',rec_user_id:id,sender_user_id:user.id,email:user.email})
    );


  }, []);


useEffect(()=>{
  fetchUserData();
},[id])





  useEffect(() => {
    socket.onopen = ()=>{
      console.log('socket connected')
    }
    return () => {
    };
  }, [socket]);

  // Listen for messages from remote uder
  socket.onmessage = (event)=>{
    const recievedMessage = JSON.parse(event.data).message;
    if (recievedMessage.event === 'chatmessage'){
    console.log(recievedMessage.content, "////////////");
    setMessages((prevMessages) => {
      return [...prevMessages, {local:false,message:recievedMessage.content}];
  })};}

  // sendig message to remote user
  const sendMessageHandler = (e) => {
    setMessages((prevMessages)=>{
      return [...prevMessages,{local:true,message:message}]
    })
    e.preventDefault();
    socket.send(JSON.stringify({event:'chat', message: message,from:user.id,to:id }));
    setMessage("");
  };

 
  return (
    <div className="chat">
      <div className="pannel">
        <div className="user_info_head">
          <div className="user_bar">
            <div className="user_avatar">
              <Avatar className="avatar">A</Avatar>
            </div>
            <div className="user_det">
              <p>{users&&users.username}</p>
              {/* <span>active</span> */}
            </div>
          </div>

          <div className="head_icons">
            <VideoCallOutlinedIcon onClick={handleSubmit} />
          </div>
        </div>
        <div className="messagespmessagesace" style={{ display: 'flex', flexDirection: 'column', justifyContent:'end' }}>
          {console.log(messages,'[jhgj')}
          {messages.map((msg,i) => (
  <React.Fragment key={i}>
    {/* {console.log(msg)} */}
    <Messages message={msg} />
  </React.Fragment>
))}
        </div>

        <div className="send_input">
          <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="send message..." />
          <button onClick={sendMessageHandler}>send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

