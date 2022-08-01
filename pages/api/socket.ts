import { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  if (res!.socket!.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    // @ts-ignore
    const io = new Server(res!.socket!.server);
    // @ts-ignore
    res!.socket!.server.io = io;

    io.on("connection", (socket: Socket) => {
      socket.on("create-room", (roomID: string) => {
        socket.join(roomID);
      });

      socket.on("play-sound", (clipName: string, roomID: string) => {
        socket.to(roomID).emit("sound-played", clipName);
      });

      socket.on('leave-room', (roomID: string) => {
        socket.leave(roomID);
      });
    });
  }

  res.end();
};

export default SocketHandler;
