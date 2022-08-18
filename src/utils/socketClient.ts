import { io } from 'socket.io-client';

(async function () {
   if (typeof window !== 'undefined')
      await fetch(window.location.origin + "/api/socket");
})();
export const socket = io({ autoConnect: false });

// when ready to connect
export const connectSocket = (userID, roomID) => {
   socket.auth = { userID, roomID };
   socket.connect();
   socket.on('connect_error', (err) => {
      console.error(err.message);
   });
}

export const socketCleanup = () => {
   socket.removeAllListeners().disconnect();
}