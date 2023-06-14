import Cookies from 'js.cookie';
import CallAlert from './Components/VedioCall/Call Alert';
import ringtone from "./assets/Whatsapp.mp3"

let socket = null;

export const connectWebSocket = () => {
  const user_id = Cookies.get('id');
  socket = new WebSocket(`ws://127.0.0.1:8000/userConnect/${user_id}`);

  socket.onopen = () => {
    console.log('WebSocket connection established');
    // Perform any necessary actions after connection is open
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // console.log('Received message:', data);
    const message = data.message;
    // console.log(message, '//////');
    const evnt = message.event;
    if (evnt === 'incoming_call') {
      // console.log('lllllllll')
    //  return (<CallAlert/>)
    }
 
  };

  socket.onclose = () => {
    // console.log('WebSocket connection closed');
    // Perform any necessary cleanup or reconnection attempts
  };

};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
  }
};

export const sendMessageToSocket = (data) => {
  if (socket) {
    socket.send(JSON.stringify(data));
  }
};

export const messageFromSocket = ()=>{
  let  datas;

  if(socket){
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log('Received message:', data);
      const message = data.message;
      // console.log(message, '//////');
      const evnt = message.event;
      if (evnt === 'incoming_call') {
      //  return (<CallAlert/>)
      }
    
      datas = data
    };

  }
  return datas

}

