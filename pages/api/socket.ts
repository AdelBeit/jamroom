import { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";
import { Instrument, User, UserStateStore } from "../../src/types";

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
    // TODO: send list of users in the room
    io.on("connection", (socket: Socket) => {
      socket.on("join-room", (roomID: UserStateStore['roomID'], username: User['id'], instrument: Instrument) => {
        socket.join(roomID);
        socket.to(roomID).emit('player-joined', username, instrument);
      });

      socket.on('leave-room', (roomID: UserStateStore['roomID']) => {
        socket.leave(roomID);
        socket.to(roomID).emit("player-left", socket.id);
      });

      socket.on("play-sound", (clipName: string, roomID: UserStateStore['roomID']) => {
        socket.to(roomID).emit("sound-played", clipName);
      });

      socket.on('change-instrument', (instrument: Instrument, roomID: UserStateStore['roomID']) => {
        socket.to(roomID).emit('instrument-changed', socket.id, instrument);
      });
    });
  }

  res.end();
};

export default SocketHandler;
