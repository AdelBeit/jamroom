import { io } from 'socket.io-client';

// client side
const URL = "api/socket";
(() => {
   if (typeof window !== "undefined") {
      fetch(URL)
   }
})();
export const socket = io({ autoConnect: false });

// when ready to connect
export const connectSocket = (userID, roomID) => {
   socket.auth = { userID, roomID };
   socket.connect();
}

export const initSocket = () => {
   // initi socket 
   socket.on('connect_error', (err) => {
      if (err.message === 'invalid userID') {
         // usestore break session
      }
   });

   // users handler
   // socket.on('users-update', (users, msg) => {
   //    // add users to store
   //    // setUsers(users);
   // });
}

//client side cleanup
export const socketCleanup = () => {
   socket.removeAllListeners().disconnect();
}

