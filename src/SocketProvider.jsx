import React,{createContext,useMemo,useContext} from "react";
import Cookies from 'js.cookie';

const SocketContext = createContext(null);

export const useSocket = ()=>{

    const socket = useContext(SocketContext);
    return socket;
}

var ws_path = ws_scheme + '://' + window.location.host + ":8001/"; // PRODUCTION

export const SocketProvider = (props)=>{
    const socket = useMemo(()=> new WebSocket(`${ws_path}/userConnect/${Cookies.get('id')}`),[])


    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}