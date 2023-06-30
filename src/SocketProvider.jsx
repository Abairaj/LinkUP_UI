import React,{createContext,useMemo,useContext} from "react";
import Cookies from 'js.cookie';

const SocketContext = createContext(null);

export const useSocket = ()=>{

    const socket = useContext(SocketContext);
    return socket;
}

// var ws_path = "wss://quantumtimes.shop:8001";
var ws_path = "ws://127.0.0.1:8000";


export const SocketProvider = (props)=>{
    const socket = useMemo(()=> new WebSocket(`${ws_path}/userConnect/${Cookies.get('id')}`),[])


    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}