import { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";
import url from "url";

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (res!.socket!.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket: Socket) => {
      // console.log(socket.client.request.);
      //   console.log(socket.client.request.headers);
      //   console.log(socket.id, "joined", req.query.roomID);
      //   console.log();
      //   const roomID = new URLSearchParams(
      //     socket.client.request.headers.referer
      //   ).get("roomID");
      //   console.log(
      //     "roomid",
      //     roomID,
      //     "referer",
      //     socket.client.request.headers.referer
      //   );
      //   const { roomID } = url.parse(
      //     socket.client.request.headers.referer as string,
      //     true
      //   ).query;
      //
      const roomID = socket.client.request.headers.referer?.split("roomID=")[1];

      console.log("room", roomID);
      socket.join(roomID as string);
      socket.on("play-sound", (clipName: string, roomID: string) => {
        // console.log("playing", clipName, "to", roomID);
        socket.to(roomID).emit("sound-played", clipName);
      });
    });

    io.of("/").adapter.on("join-room", (roomID: string, socketID: string) => {
      //   console.log("room", roomID, "socket", socketID);
    });
  }

  res.end();
};

export default SocketHandler;
