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
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const room_name = user.id * id;
  const socket = useSocket();
  const navigate = useNavigate();

  const fetchUserData = () => {
    axiosInstance
      .get(`users/user_profile/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = useCallback(() => {
    navigate(`/video_call_web/${id}`)
    // navigate(`/call_alert`)

    socket.send(
      // JSON.stringify({ event: "join:room", email: user.email, room: user.id })
      JSON.stringify({event:'join:room',rec_user_id:id,sender_user_id:user.id,email:user.email})
    );


  }, []);


  socket.onmessage = (event) => {
    const message = JSON.parse(event.data).message;
    if(message.event === 'join_room'){
      navigate(`/call_alert/${id}`)
      console.log('lllllllllllllhhhhhhhhhhhhhhhhhhhhhhh')

    }
    // navigate(`/video_call_web/${id}`)



  };

  const handleJoinRoom = useCallback((data)=>{
    const{email,user_id} = data;
    navigate(`/video_call_web/${user_id}`)
    
  },[navigate])

  useEffect(() => {
    fetchUserData();
    socket.onopen = ()=>{
      console.log('socket connected')
    }
    return () => {
      // socket.close();
    };
  }, [socket]);

  // Listen for messages
  socket.addEventListener("message", function (event) {
    const recievedMessage = JSON.parse(event.data).message;
    console.log(recievedMessage, "////////////");
    setMessages((prevMessages) => {
      return [...prevMessages, recievedMessage];
    });
  });

  const [message, setMessage] = useState("");
  const sendMessageHandler = (e) => {
    e.preventDefault();
    socket.send(JSON.stringify({ message: message }));
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
              <p>Abai</p>
              {/* <span>active</span> */}
            </div>
          </div>

          <div className="head_icons">
            <VideoCallOutlinedIcon onClick={handleSubmit} />
          </div>
        </div>

        <div className="send_input">
          <input type="text" placeholder="send message..." />
          <button>send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

{
  /* <Card className="card">
<CardContent>
  <Stack
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "8px",
    }}
  >
    <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
      <Avatar>A</Avatar>
      <Typography sx={{ marginTop: "8px" }}>Abai</Typography>
    </Stack>
    <Stack
      className="icons"
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <VideoCallOutlinedIcon sx={{ cursor: "pointer" }} />
    </Stack>
  </Stack>

  <Divider />
  {messages && messages.length > 0
    ? messages.map((msg, index) => (
        <Stack
          key={index}
          sx={{ width: "90%", marginTop: "30px", padding: "40px" }}
          className="messages"
        >
          <Messages msg={msg} />
        </Stack>
      ))
    : ""}
</CardContent>
<CardActions
  sx={{
    display: "flex",
    flexDirection: "row",
    gap: 3,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "90%",
    margin: "5px",
  }}
>
  <TextField
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    sx={{ width: "95%", margin: "2px" }}
    size="small"
    placeholder="Send message"
  />
  <Button onClick={sendMessageHandler} variant="contained">
    Send
  </Button>
</CardActions>
</Card> */
}
