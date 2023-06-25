import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSocket } from "../../SocketProvider";
import * as React from "react";
import { useDispatch } from "react-redux";
import { notification } from "../../Redux/Slice/NotificationSlice";

export const TriggerCall = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notificationContent, setNotificationContent] = React.useState("");
  const [notifications, setNotifications] = React.useState(true);

  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data).message;
      if (message.event === "join_room") {
        const id = message.user_id;
        navigate(`/call_alert/${id}`);
      }
      if (message.event === "notification") {
        console.log(message.content);
        dispatch(notification(message.content));
        setNotificationContent(message.event);
        setNotifications(true);
      }
    };
  }, []);
};
