import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Divider, Stack, TextField } from "@mui/material";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import Messages from "./Messages";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Chat.scss";
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
  const socket = new WebSocket(`ws://localhost:8000/chat/${room_name}`);

  useEffect(() => {

    return () => {
      socket.close();
    };
  }, []);

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
    <div>
      <Card sx={{ minWidth: "50vw", minHeight: "100vh", position: "relative" }}>
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
      </Card>
    </div>
  );
};

export default Chat;
