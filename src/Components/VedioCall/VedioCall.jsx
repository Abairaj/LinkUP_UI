import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CallEndOutlinedIcon from "@mui/icons-material/CallEndOutlined";
import peer from "./PeerConnectionServices";
import { useSocket } from "../../SocketProvider";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import "./videoCall.scss";

const VideoCall = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(false);
  const socket = useSocket();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    const offer = await peer.getOffer();
    socket.send(
      JSON.stringify({
        event: "call_user",
        to: id,
        from: user.id,
        offer: offer,
      })
    );
    if (stream && localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
  }, [id, socket, user.id,localStream]);


  const handleIncomingCall = useCallback(
    async (from, offer) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);

      const ans = await peer.getAnswer(offer);

      socket.send(
        JSON.stringify({
          event: "call_accepted",
          to: id,
          from: user.id,
          answer: ans,
        })
      );
    },
    [id, socket, user.id]
  );

  const sentStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    for (const track of stream.getTracks()) {
      peer.peer.addTrack(track, stream);
    }
  }, []);

  const handleCallAccepted = useCallback(
    async (from, answer) => {
      await peer.setLocalDescription(answer);
      sentStream();
    },
    [sentStream]
  );

  const handleIncomingNegotiation = useCallback(
    async (from, offer) => {
      const ans = await peer.getAnswer(offer);
      socket.send(JSON.stringify({ event: "nego_done", answer: ans, to: id }));
    },
    [id, socket]
  );

  const handleNegotiationFinal = useCallback(async (ans) => {
    await peer.setLocalDescription(ans);
  }, []);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data).message;

    if (message.event === "incoming_call") {
      handleIncomingCall(message.from, message.offer);
    }

    if (message.event === "call_accepted") {
      handleCallAccepted(message.from, message.answer);
    }

    if (message.event === "negotiationneeded") {
      handleIncomingNegotiation(message.from, message.offer);
    }

    if (message.event === "nego_done") {
      handleNegotiationFinal(message.answer);
    }
  };

  const handleNegotiationNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.send(
      JSON.stringify({ event: "negotiationneeded", offer: offer, to: id })
    );
  }, [id, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);

    return () => {
      peer.peer.removeEventListener(
        "negotiationneeded",
        handleNegotiationNeeded
      );
    };
  }, [handleNegotiationNeeded]);

  useEffect(() => {
    const handleTrackEvent = (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream[0];
      }
    };

    peer.peer.addEventListener("track", handleTrackEvent);

    return () => {
      peer.peer.removeEventListener("track", handleTrackEvent);
      setRemoteStream(null);
    };
  }, [peer.peer]);

  useEffect(() => {
    handleCallUser();
    return () => {
      handleEndCall();
    };
  }, []);

  const handleSentStream = useCallback(() => {
    setCamOn(true);
    sentStream();
  }, [sentStream]);

  const handleTurnOffCameraButtonClick = useCallback(() => {
    setCamOn(false);
  }, []);

  const handleToggleMic = useCallback(() => {
    setMicOn((prevMicOn) => !prevMicOn);
  }, []);

  const handleEndCall = async () => {
    console.log("handle endcall");
    if (localStream) {
      await localStream.getTracks().forEach((track) => track.stop());
      peer.peer.close();
      navigate(`/chat/${id}`);
      window.location.reload()      

    }
  };

  const toggleCam = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        const videoTrack = videoTracks[0];
        videoTrack.enabled = !camOn;
        setCamOn(!camOn);
      }
    }
  };
  
  return (
    <div className="videos">
      <div className="streams">
        local
        <video
          ref={localVideoRef}
          className="localVideo"
          autoPlay
          playsInline
        />
        remote
        <video
          ref={peer.peer && remoteVideoRef}
          className="remoteVideo"
          autoPlay
          playsInline
        />
      </div>

      <div className="icons">
        {micOn ? (
          <MicIcon
            sx={{ color: "green", fontSize: "38px" }}
            className="icon"
            onClick={handleToggleMic}
          />
        ) : (
          <MicOffIcon
            sx={{ color: "red", fontSize: "38px" }}
            onClick={handleToggleMic}
            className="icon"
          />
        )}

        {camOn ? (
          <VideocamIcon
            sx={{ color: "green", fontSize: "38px" }}
            className="icon"
            onClick={handleTurnOffCameraButtonClick}
          />
        ) : (
          <VideocamOffIcon
            sx={{ color: "red", fontSize: "38px" }}
            className="icon"
            onClick={toggleCam}
          />
        )}

        <CallEndOutlinedIcon
          className="icon"
          sx={{ color: "red", fontSize: "38px" }}
          onClick={handleEndCall}
        />

        <button onClick={handleSentStream}>start</button>
      </div>
    </div>
  );
};

export default VideoCall;
