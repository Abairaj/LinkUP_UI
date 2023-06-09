import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "./videoCallAgora.scss";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicOffIcon from "@mui/icons-material/MicOff";
import { CallEndOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function VideoCallAgora() {
  const [client, setClient] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [remoteUser, setRemoteUser] = useState(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userId = uuidv4() + user.id;

  useEffect(() => {
    // Initialize Agora RTC client
    const rtcClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setClient(rtcClient);
  }, []);

  useEffect(() => {
    if (localVideoTrack && localVideoRef.current) {
      localVideoTrack.play(localVideoRef.current);
    }
  }, [localVideoTrack]);

  function joinVideoCall() {
    // Join the video call
    client
      .join(
        "ed81ebe4778d425eb3b42ecabdfac117",
        "channel1",
        null,
        parseInt(userId)
      )
      .then((uid) => {
        console.log("Successfully joined the channel:", uid);
        // Enable local audio and video tracks
        AgoraRTC.createMicrophoneAudioTrack()
          .then((audioTrack) => {
            setLocalAudioTrack(audioTrack);
            client.publish([audioTrack]);
          })
          .catch((error) => {
            console.log("Error creating local audio track:", error);
          });

        AgoraRTC.createCameraVideoTrack()
          .then((videoTrack) => {
            setLocalVideoTrack(videoTrack);
            client.publish([videoTrack]);
          })
          .catch((error) => {
            console.log("Error creating local video track:", error);
          });

        // Subscribe to remote users' audio and video tracks
        client.on("user-published", (user, mediaType) => {
          subscribeToRemoteUser(user, mediaType);
        });

        // Handle remote user leaving
        client.on("user-unpublished", (user) => {
          removeRemoteUser(user);
        });
      })
      .catch((error) => {
        console.log("Error joining the channel:", error);
      });
  }

  function subscribeToRemoteUser(user, mediaType) {
    // Limit the number of remote users to one
    if (remoteUser) return;

    // Subscribe to remote user's audio and video tracks
    client
      .subscribe(user, mediaType)
      .then(() => {
        console.log("Successfully subscribed to remote user:", user.uid);
        if (mediaType === "audio") {
          // Handle remote user's audio track
        } else if (mediaType === "video") {
          setRemoteUser(user);
          const videoTrack = user.videoTrack;
          if (videoTrack && remoteVideoRef.current) {
            videoTrack.play(remoteVideoRef.current).catch((error) => {
              console.log("Error playing remote video:", error);
            });
          }
        }
      })
      .catch((error) => {
        console.log("Error subscribing to remote user:", error);
      });
  }

  function cancelCall() {
    if (client) {
      client.leave();
      setClient(null);
      navigate("/chat");
    }
  }

  function removeRemoteUser(user) {
    // Remove remote user's audio and video tracks
    setRemoteUser(null);
  }

  function toggleMic() {
    if (localAudioTrack) {
      localAudioTrack.setEnabled(!isMicMuted);
      setIsMicMuted(!isMicMuted);
    }
  }

  useEffect(() => {
    // Reconnect the call on page refresh
    window.addEventListener("beforeunload", handlePageRefresh);
    return () => {
      window.removeEventListener("beforeunload", handlePageRefresh);
    };
  }, []);

  function handlePageRefresh() {
    if (client) {
      client.leave();
      setClient(null);
    }
  }

  useEffect(() => {
    if (!client) return;

    joinVideoCall();

    return () => {
      if (client) {
        client.leave();
        setClient(null);
      }
    };
  }, [client]);

  return (
    <div className="video-call-container">
      <div className="video-container">
        <div className="local-video-container">
          <div className="local-video" ref={localVideoRef}></div>
        </div>
        <div className="remote-video-container">
          <div className="remote-video" ref={remoteVideoRef}></div>
        </div>
      </div>
      <div className="buttons">
        {isMicMuted ? (
          <MicOffIcon
            sx={{
              color: "red",
              paddingRight: "10px",
              fontSize: "34px",
              cursor: "pointer",
            }}
            onClick={toggleMic}
          />
        ) : (
          <MicNoneIcon
            sx={{
              color: "green",
              paddingRight: "10px",
              fontSize: "34px",
              cursor: "pointer",
            }}
            onClick={toggleMic}
          />
        )}
        <CallEndOutlined
          sx={{
            color: "red",
            paddingRight: "10px",
            fontSize: "34px",
            cursor: "pointer",
          }}
          onClick={cancelCall}
        />
      </div>
    </div>
  );
}

export default VideoCallAgora;
