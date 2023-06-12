import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  connectWebSocket,
  sendMessageToSocket,
  closeWebSocket,
} from "../../socket";

const VedioCall = () => {
  const localRef = useRef();
  const remoteRef = useRef();
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const { id } = useParams();
  const user = useSelector((state) => state.user);

  const room_name = user.id * id;

  const clickHandler = () => {
    sendMessageToSocket({ event: "call_user", user_id: 1, room_id: "45" });
  };

  const handleWebSocketMessage = (data) => {
    console.log("Received WebSocket message:", data);
    // Handle the received data as needed
  };

  useEffect(() => {
    connectWebSocket(handleWebSocketMessage);
    init();

    return () => {
      closeWebSocket();
    };
  }, []);

  let localStream;
  let remoteStream;
  let peerConnection;
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Perform necessary actions with email and roomId
  }, []);

  const init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    localRef.current.srcObject = localStream;
    createOffer(localStream);
  };

  const createOffer = async (localStream) => {
    peerConnection = new RTCPeerConnection(servers);
    remoteStream = new MediaStream();
    remoteRef.current.srcObject = remoteStream;
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };


    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log("new ice candidate: ", event.candidate);
      }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log("offer: ", offer);
  };

  return (
    <div id="videos">
      <video
        ref={localRef}
        className="video-player"
        id="local"
        autoPlay
        playsInline
      />
      <video
        ref={remoteRef}
        className="video-player"
        id="remote"
        autoPlay
        playsInline
      />

      <div>
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="email"
          />
          <input
            type="text"
            onChange={(e) => setRoomId(e.target.value)}
            className="room_id"
          />
          <button>submit</button>
        </form>
        <button onClick={clickHandler}>call</button>
      </div>
    </div>
  );
};

export default VedioCall;
