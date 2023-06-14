import { Outlet } from "react-router-dom"
import ChatApp from "./ChatApp";
import { TriggerCall } from "./Triggercall";

export const ChatLayout = ()=>{
    return(
        <div className="chatLayout" style={{display:'flex',justifyContent:'center'}}>
        <div className="chatUsers" >
            <ChatApp/>
        </div>
        <div className="chatpannel">
            <Outlet/>
            <TriggerCall/>
            
        </div>
        </div>
    )
}