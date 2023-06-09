import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./videoCall.scss";
import { useSelector } from "react-redux";
import Cookies from 'js.cookie'
import peer from './PeerConnectionServices'

const VideoCall = () => {
  const [roomID, setRoomID] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const websocketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const isMicMutedRef = useRef(false);
  const isCameraFlippedRef = useRef(false);
  const isCameraOnRef = useRef(true);
  const user = useSelector((state) => state.user);
  console.log(user.id, "kkkkkkkkkkkkkkkkkkkkk");

  useEffect(() => {
    if (!roomID) {
      const generatedRoomID = uuidv4();
      setRoomID(generatedRoomID);
    }

    const initVideoCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;

        const wsUrl = `ws://localhost:8000/ws/video_call/${roomID}/${user.id}`;
        const websocket = new WebSocket(wsUrl);

        // Add the JWT token to the WebSocket connection headers
        const token = Cookies.get("token");
        websocketRef.current = websocket;
        websocketRef.current.onopen = () => {
          websocketRef.current.send(JSON.stringify(joinMessage));
        };
        websocketRef.current.onmessage = (event) => {
          const message = JSON.parse(event.data);
          handleWebsocketMessage(message);
        };
        websocketRef.current.setRequestHeader(
          "Authorization",
          `Bearer ${token}`
        );
        websocketRef.current = websocket;

        websocket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          handleWebsocketMessage(message);
        };

        const joinMessage = {
          action: "join",
          user_id: user.id,
          username: user.username,
        };

        websocket.send(JSON.stringify(joinMessage));
      } catch (error) {
        console.error("Error initializing video call:", error);
      }
    };

    initVideoCall();

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }

      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [roomID]);

  const handleWebsocketMessage = (message) => {
    const { action, user_id, username, offer, answer, candidate } = message;

    switch (action) {
      case "join":
        console.log(
          `User ${username} with ID ${user_id} joined the video call`
        );
        break;
      case "leave":
        console.log(`User ${username} with ID ${user_id} left the video call`);
        break;
      case "offer":
        handleOffer(user_id, offer);
        break;
      case "answer":
        handleAnswer(user_id, answer);
        break;
      case "ice_candidate":
        handleIceCandidate(user_id, candidate);
        break;
      default:
        break;
    }
  };

  const handleOffer = async (callingUserID, offer) => {
    const pc = new RTCPeerConnection();
    peerConnectionRef.current = pc;

    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

    await pc.setRemoteDescription(offer);

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    const answerMessage = {
      action: "answer",
      calling_channel_name: callingUserID,
      answer: pc.localDescription,
    };
    websocketRef.current.send(JSON.stringify(answerMessage));
    pc.setLocalDescription(answer);
  };

  const handleAnswer = async (calledUserID, answer) => {
    await peerConnectionRef.current.setRemoteDescription(answer);
  };

  const handleIceCandidate = (otherUserID, candidate) => {
    peerConnectionRef.current.addIceCandidate(candidate);
  };

  const toggleMicMute = () => {
    const tracks = localStream.getAudioTracks();
    tracks.forEach((track) => {
      track.enabled = !track.enabled;
    });
    isMicMutedRef.current = !isMicMutedRef.current;
  };

  const toggleCameraFlip = () => {
    const tracks = localStream.getVideoTracks();
    tracks.forEach((track) => {
      track.applyConstraints({
        facingMode: isCameraFlippedRef.current ? "user" : "environment",
      });
    });
    isCameraFlippedRef.current = !isCameraFlippedRef.current;
  };

  const toggleCamera = () => {
    const tracks = localStream.getVideoTracks();
    tracks.forEach((track) => {
      track.enabled = !track.enabled;
    });
    isCameraOnRef.current = !isCameraOnRef.current;
  };

  return (
    <div className="video-call-container">
      <h2>Video Call</h2>
      <div className="video-section">
        <div className="local-stream">
          <h3>Local Stream</h3>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="video-stream"
          />
          <button onClick={toggleMicMute}>
            {isMicMutedRef.current ? "Unmute Mic" : "Mute Mic"}
          </button>
          <button onClick={toggleCameraFlip}>
            {isCameraFlippedRef.current ? "Flip Camera" : "Original Camera"}
          </button>

          <button onClick={toggleCamera}>camera on/off</button>
        </div>
        <div className="remote-stream">
          <h3>Remote Stream</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="video-stream"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
