import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { User, UserStateStore } from "../../src/types";

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  if (res!.socket!.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const rooms: { [roomID: UserStateStore['roomID']]: { [socketID: string]: [User['id'], User['instrument'], User['volume']] } } = {};
    // @ts-ignore
    const io = new Server(res!.socket!.server);
    // @ts-ignore
    res!.socket!.server.io = io;

    /* 
    *  middleware
    *  check for roomid and userid
    */
    io.use((socket, next) => {
      const userID = socket.handshake.auth.userID;
      const roomID = socket.handshake.auth.roomID
      if (!userID) return next(new Error("invalid userID"));
      if (!roomID) return next(new Error("invalid roomID"));

      socket['userID'] = userID;
      socket['roomID'] = roomID;
      next();
    });

    /* 
    *  connect
    */
    io.on('connection', (socket) => {
      const roomID = socket['roomID'];
      if (!rooms[roomID]) rooms[roomID] = {}
      rooms[roomID][socket.id] = [socket['userID'], 'keys', 100];

      socket.join(roomID);

      io.of('/').adapter.on('join-room', (roomID, socketID) => {
        if (roomID != socketID) socket.to(roomID).emit('users-update', rooms[roomID], `${socketID} joined the room`);
      });

      socket.on("play-sound", (clipName: string, roomID: UserStateStore['roomID']) => {
        socket.to(roomID).emit("sound-played", clipName);
      });

      socket.on('change-instrument', (instrument: User['instrument'], roomID: UserStateStore['roomID']) => {
        const user = rooms[roomID][socket.id];
        rooms[roomID][socket.id] = [user[0], instrument, user[2]];
        io.to(roomID).emit('users-update', rooms[roomID], `${user[0]} changed instruments`);
      });

      socket.on('change-volume', (volume: User['volume'], roomID: UserStateStore['roomID']) => {
        const user = rooms[roomID][socket.id];
        rooms[roomID][socket.id] = [user[0], user[1], volume];
        socket.to(roomID).emit('users-update', rooms[roomID], `${user[0]} changed volume`);
      });

      io.of('/').adapter.on('leave-room', (roomID, socketID) => {
        if (socketID != roomID) {
          delete rooms[roomID][socketID];
          io.to(roomID).emit('users-update', rooms[roomID], `${socketID} left the room`);
        }
      });

      socket.on('disconnecting', () => {
        for (let roomID of Array.from(socket.rooms)) {
          if (roomID != socket.id) {
            delete rooms[roomID][socket.id];
            io.to(roomID).emit('users-update', rooms[roomID], `${socket.id} disconnected`);
          }
        }
      });

      socket.on('disconnect', (reason) => {
        socket.removeAllListeners();
      });
    });
  }

  res.end();
};

export default SocketHandler;
