import { Outlet } from "react-router-dom"
import ChatApp from "./ChatApp"

export const ChatLayout = ()=>{
    return(
        <div className="chatLayout" style={{display:'flex',justifyContent:'center'}}>
        <div className="chatUsers" >
            <ChatApp/>
        </div>
        <div className="chatpannel">
            <Outlet/>
        </div>
        </div>
    )
}