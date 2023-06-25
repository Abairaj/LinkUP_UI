import React,{createContext,useMemo,useContext} from "react";
import Cookies from 'js.cookie';

const SocketContext = createContext(null);

export const useSocket = ()=>{

    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = (props)=>{
    const socket = useMemo(()=> new WebSocket(`wss://54.92.214.175:8001/userConnect/${Cookies.get('id')}`),[])


    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}