import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";

const VideoCall= () => {
  const socketRef = useRef();
  const peerRef = useRef();
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoFlipped, setIsVideoFlipped] = useState(false);

  useEffect(() => {
    socketRef.current = io("http://localhost:8000");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;

        socketRef.current.emit("join room", "roomId");

        socketRef.current.on("other user", (otherUserId) => {
          initiatePeerConnection(otherUserId);
        });

        socketRef.current.on("offer", (data) => {
          handleOffer(data);
        });

        socketRef.current.on("answer", (data) => {
          handleAnswer(data);
        });

        socketRef.current.on("ice-candidate", (data) => {
          handleICECandidate(data);
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const initiatePeerConnection = (otherUserId) => {
    peerRef.current = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: localVideoRef.current.srcObject,
    });

    peerRef.current.on("signal", (data) => {
      socketRef.current.emit("offer", {
        signalData: data,
        otherUserId,
      });
    });

    peerRef.current.on("stream", (stream) => {
      remoteVideoRef.current.srcObject = stream;
    });

    peerRef.current.on("error", (error) => {
      console.error("Peer connection error:", error);
    });
  };

  const handleOffer = (data) => {
    peerRef.current = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: localVideoRef.current.srcObject,
    });

    peerRef.current.on("signal", (signalData) => {
      socketRef.current.emit("answer", {
        signalData,
        otherUserId: data.otherUserId,
      });
    });

    peerRef.current.on("stream", (stream) => {
      remoteVideoRef.current.srcObject = stream;
    });

    peerRef.current.on("error", (error) => {
      console.error("Peer connection error:", error);
    });

    peerRef.current.signal(data.signalData);
  };

  const handleAnswer = (data) => {
    peerRef.current.signal(data.signalData);
  };

  const handleICECandidate = (data) => {
    peerRef.current.addIceCandidate(data.signalData);
  };

  const handleAudioToggle = () => {
    const localStream = localVideoRef.current.srcObject;
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !isAudioMuted;
    });
    setIsAudioMuted(!isAudioMuted);
  };

  const handleVideoFlip = () => {
    const localStream = localVideoRef.current.srcObject;
    localStream.getVideoTracks().forEach((track) => {
      track._switchCamera();
    });
    setIsVideoFlipped(!isVideoFlipped);
  };

  const handleEndCall = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    const localStream = localVideoRef.current.srcObject;
    localStream.getTracks().forEach((track) => {
      track.stop();
    });
    remoteVideoRef.current.srcObject = null;
  };

  return (
    <div>
      <div>
        <video ref={localVideoRef} autoPlay muted />
        <video ref={remoteVideoRef} autoPlay />
      </div>
      <div>
        <button onClick={handleAudioToggle}>
          {isAudioMuted ? "Unmute Audio" : "Mute Audio"}
        </button>
        <button onClick={handleVideoFlip}>
          {isVideoFlipped ? "Flip Camera" : "Unflip Camera"}
        </button>
        <button onClick={handleEndCall}>End Call</button>
      </div>
    </div>
  );
};

export default VideoCall;
