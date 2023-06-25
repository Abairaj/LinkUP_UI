import { Outlet } from "react-router-dom";
import ChatApp from "./ChatApp";
import { TriggerCall } from "./Triggercall";

export const ChatLayout = () => {
  return (
    <div
      className="chatLayout"
      style={{ display: "flex", justifyContent: "center",padding:'20px' }}
    >
      <div className="chatUsers">
        <ChatApp />
      </div>
      <div className="chatpannel">
        <TriggerCall />

        <Outlet />
      </div>
    </div>
  );
};
