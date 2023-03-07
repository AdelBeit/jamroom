import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { User } from "../../src/types";
import { UserStateStore } from "../../src/hooks/useUsers";

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  if (res.socket.server.io) {
    console.log("socket already initialized");
    res.end();
    return;
  }

  console.log("Socket is initializing");
  const rooms: {
    [roomID: UserStateStore["roomID"]]: {
      [socketID: string]: [User["id"], User["instrument"]];
    };
  } = {};
  // @ts-ignore
  const io = new Server(res.socket.server, {
    cors: { origin: req.headers.host },
  });
  // @ts-ignore
  res.socket.server.io = io;

  /*
   *  middleware
   *  check for roomid and userid
   */
  io.use((socket, next) => {
    const userID = socket.handshake.auth.userID;
    const roomID = socket.handshake.auth.roomID;
    if (!userID) return next(new Error("invalid userID"));
    if (!roomID) return next(new Error("invalid roomID"));

    socket["userID"] = userID;
    socket["roomID"] = roomID;
    next();
  });

  /*
   *  connect
   */
  io.on("connection", (socket) => {
    const roomID = socket["roomID"];
    if (!rooms[roomID]) rooms[roomID] = {};
    rooms[roomID][socket.id] = [socket["userID"], "drumkit"];

    socket.join(roomID);

    io.to(roomID).emit(
      "users-update",
      rooms[roomID],
      `${socket.id} joined room ${roomID}`
    );

    socket.on(
      "play-sound",
      (sample: string, roomID: UserStateStore["roomID"]) => {
        socket.to(roomID).emit("sound-played", socket["userID"], sample);
      }
    );

    socket.on(
      "change-instrument",
      (instrument: User["instrument"], roomID: UserStateStore["roomID"]) => {
        const user = rooms[roomID][socket.id];
        rooms[roomID][socket.id] = [user[0], instrument];
        io.to(roomID).emit(
          "users-update",
          rooms[roomID],
          `${user[0]} changed instruments`
        );
      }
    );

    socket.on("disconnect", (reason) => {
      socket.removeAllListeners();
      let roomID = socket["roomID"];
      if (rooms[roomID] && rooms[roomID][socket.id]) {
        delete rooms[roomID][socket.id];
        if (Object.keys(rooms[roomID]).length < 1) delete rooms[roomID];
        io.to(roomID).emit(
          "users-update",
          rooms[roomID],
          `${socket.id} left room ${roomID}`
        );
      }
    });
  });

  res.end();
};

export default SocketHandler;
