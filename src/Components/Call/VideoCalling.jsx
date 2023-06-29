import React, { useCallback, useEffect } from "react";
import "./videoCalling.scss";
import { useSocket } from "../../SocketProvider";

const VideoCalls = () => {
  const socket = useSocket();
  const handleJoinroom = useCallback((data) => {
    console.log(data,'///////////////')
    const { email, room } = data;
    console.log(email, room);
  });

  useEffect(() => {
    socket.onmessage = (event) => {
      socket.addEventListener("message", handleJoinroom);
      return () => {
        socket.addEventListener("message", handleJoinroom);
      };
    };
  });
  return (
    <div className="videocall">
      <div className="streams">
        <div className="remotestream">
          <video src=""></video>
        </div>
        <div className="localstream">
          <video src=""></video>
        </div>
      </div>
    </div>
  );
};

export default VideoCalls;
