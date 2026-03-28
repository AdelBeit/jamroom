import { io } from "socket.io-client";
import debugLog from "./debugLog";

(async function () {
  if (typeof window !== "undefined") {
    const res = await fetch(window.location.origin + "/api/socket");
    debugLog("/api/socket response status:", res.status);
  }
})();
export const socket = io({ autoConnect: false });

// when ready to connect
export const connectSocket = (userID, roomID) => {
  debugLog("connectSocket called, userID:", userID, "roomID:", roomID);
  socket.auth = { userID, roomID };
  socket.connect();
  socket.on("connect_error", (err) => {
    console.error(err.message);
  });
};

export const socketCleanup = () => {
  socket.removeAllListeners().disconnect();
};
