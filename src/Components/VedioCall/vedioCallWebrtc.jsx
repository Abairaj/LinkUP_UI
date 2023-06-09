import React, { useCallback, useEffect, useState } from "react";

export default function VedioCallWebrtc() {
  const socket = new WebSocket("ws://127.0.0.1:8000/ws/video_call/");
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");


  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      socket.send(
        JSON.stringify({ event_type: "room:join", room: room, email: email })
      );
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const{email,room} = data
  },[]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      handleJoinRoom(response);
      console.log(response, "this is backend data");

      return ()=>{
        socket.close();
        handleJoinRoom(response);
      }
    };
  }, [socket,handleJoinRoom]);
  return (
    <div className="videocall">
      <div className="lobby_container" style={{ textAlign: "center" }}>
        <div className="lobbyscreen"></div>

        <form
          action="submit"
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="formgroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              className="email"
            />
          </div>

          <div className="formgroup">
            <label htmlFor="room_no">Room No</label>
            <input
              type="text"
              onChange={(e) => setRoom(e.target.value)}
              value={room}
              id="room_no"
              className="room_no"
            />
          </div>
          <div className="button">
            <button type="submit">Join</button>
          </div>
        </form>
      </div>

      <div className="remote_container">
        <div className="remotescreen"></div>
      </div>
    </div>
  );
}
