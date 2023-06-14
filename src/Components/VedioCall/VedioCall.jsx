import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ReactPlayer from "react-player";
import Cookies from "js.cookie";
import peer from './PeerConnectionServices';
import { useSocket } from "../../SocketProvider";

const VideoCall = () => {
  const user = useSelector(state=>state.user)
   const {id} = useParams()
   const [localStream,setLocalStream] = useState([]);
   const [remoteStream,setRemoteStream] = useState([]);
   const socket = useSocket();

  const handleCallUser = useCallback(async()=>{
const stream = await navigator.mediaDevices.getUserMedia({
  video:true,
  audio:true
})
const offer = await peer.getOffer();
socket.send(JSON.stringify({event:'call_user',to:id,from:user.id,offer:offer}))
setLocalStream(stream);
   },[id,socket])


const handleIncomingCall = useCallback(async (from,offer)=>{

  const stream = await navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
  })
  setLocalStream(stream);

  const ans = await peer.getAnswer(offer);

  socket.send(JSON.stringify({event:'call_accepted',to:id,from:user.id,answer:ans}));

}
,[])

const sentStream = useCallback(async()=>{

    console.log('call accepted',localStream);
    for (const track of localStream.getTracks()){
      peer.peer.addTrack(track,localStream)
  
    }
})

const handleCallAccepted = useCallback(async(from,answer)=>{
peer.setLocalDescription(answer);
 
  sentStream()

},[])



const handleIncomingNegotiation= useCallback(async (from,offer)=>{

  const ans = await peer.getAnswer(offer);
  socket.send(JSON.stringify({event:'nego_done',answer:ans,to:id}))

},[])


const handleNegotiationFinal = useCallback(async(ans)=>{
await peer.setLocalDescription(ans)
},[])




socket.onmessage = (event)=>{
 const message = JSON.parse(event.data).message

  if(message.event == 'incoming_call'){

    handleIncomingCall(message.from,message.offer);
console.log(message,'{{{{{{{{{{{{{[[[')

  }

  if(message.event == 'call_accepted'){

    handleCallAccepted(message.from,message.answer)

console.log(message,'{{{{{{{{{{{{{[[[')

  }

  if(message.event == 'negotiationneeded'){

    handleIncomingNegotiation(message.from,message.offer)

console.log(message,'{{{{{{{{{{{{{[[[')

  }

  if(message.event == 'nego_done'){

handleNegotiationFinal(message.answer)
console.log(message,'{{{{{{{{{{{{{[[[')

  }

  

}


const handleNegotiationNeeded = useCallback(async()=>{
const offer = await peer.getOffer();
socket.send(JSON.stringify({event:'negotiationneeded',offer:offer,to:id}))

},[])


useEffect(()=>{
  peer.peer.addEventListener('negotiationneeded',handleNegotiationNeeded)

return ()=>{
  peer.peer.removeEventListener('negotiationneeded',handleNegotiationNeeded)
}

},[])


useEffect(()=>{

  peer.peer.addEventListener('track',async ev =>{
    const remoteStream = ev.streams;
    setRemoteStream(remoteStream[0]);
  })

},[socket])


   useEffect(()=>{
    handleCallUser();
   },[])
   

  return (
    <div id="videos" style={{ display: "flex", gap: "50px" }}>
      <div
        className="mystream"
        style={{ backgroundColor: "black", minWidth: "400px" }}
      >
        <h1 style={{ color: "white" }}>My Stream</h1>
        {localStream && (
          <ReactPlayer
            playing
            muted
            height="300px"
            width="400px"
            url={localStream}
          />
        )}
      </div>

      <div
        className="remotestream"
        style={{ backgroundColor: "black", minWidth: "400px" }}
      >
        <h1 style={{ color: "white" }}>Remote Stream</h1>
        {remoteStream && (
          <ReactPlayer
            playing
            muted
            height="300px"
            width="400px"
            url={remoteStream}
          />
        )}

        <button onClick={sentStream}>accept</button>
      </div>
    </div>
  );
};

export default VideoCall;
