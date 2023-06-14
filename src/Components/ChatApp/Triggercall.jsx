import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSocket } from "../../SocketProvider";



export const TriggerCall = () => {
    const socket = useSocket()
    const navigate = useNavigate();

    useEffect(() => {
      socket.onmessage = (event) => {
        console.log(event);
        const message = JSON.parse(event.data).message;
        if (message.event === "join_room") {
          console.log("[{{{{{{{{{{{{{{{{{{{{{{]}}}}}}}}}}}}}}}");
          const id = message.user_id;
          navigate(`/call_alert/${id}`);
        }
      };
    },[]);
  };