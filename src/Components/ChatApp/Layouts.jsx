import { Outlet } from "react-router-dom";
import ChatApp from "./ChatApp";
import { TriggerCall } from "./Triggercall";
import Chat from "./Chat";
import Mobilechat from "./Mobilechat"

export const ChatLayout = () => {
  const isMobile = window.innerWidth <= 768; 

  return (
    <>
      {/* {isMobile ? (
        <div
          className="chatLayout"
          style={{width:'100vw',display:'flex',justifySelf:'center'}
        }
          >
            <Mobilechat/>
          <div className="chatpannel">
            <TriggerCall />
            {/* <Chat /> */}
          {/* </div>
        </div> */}
      {/* ) : ( */} 
        <div
          className="chatLayout"
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <div className="chatUsers">
            <ChatApp />
          </div>
          <div className="chatpannel">
            <TriggerCall />
            <Chat />
          </div>
        </div>
      {/* )} */}
    </>
  );
};
