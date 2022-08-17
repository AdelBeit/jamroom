import { io } from 'socket.io-client';

// client side
export const socket = io({ autoConnect: false });

// when ready to connect
export const connectSocket = (userID, roomID) => {
   socket.auth = { userID, roomID };
   socket.connect();
   // initi socket 
   socket.on('connect_error', (err) => {
      console.error(err.message);
   });
}


//client side cleanup
export const socketCleanup = () => {
   socket.removeAllListeners().disconnect();
}

