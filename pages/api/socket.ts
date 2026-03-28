import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import Redis from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";
import { User } from "../../src/types";
import { UserStateStore } from "../../src/hooks/useUsers";
import debugLog from "../../src/utils/debugLog";

const SocketHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  debugLog("/api/socket handler called");
  // @ts-ignore
  if (res.socket.server.io) {
    console.log("socket already initialized");
    res.end();
    return;
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    throw new Error("REDIS_URL is required. Set it in your .env file.");
  }

  debugLog("REDIS_URL:", redisUrl);
  console.log("Socket is initializing");
  // @ts-ignore
  const io = new Server(res.socket.server, {
    cors: { origin: req.headers.host },
  });
  // @ts-ignore
  res.socket.server.io = io;

  const pubClient = new Redis(redisUrl);
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient) as any);
  console.log("Redis adapter connected");
  debugLog("Redis pub/sub adapter initialized");

  const staleKeys = await pubClient.keys("room:*");
  if (staleKeys.length) {
    await pubClient.del(...staleKeys);
    debugLog("Cleared stale room keys on startup:", staleKeys);
  }

  const parseRoomState = (raw: Record<string, string>) =>
    Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, JSON.parse(v)]));

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
  io.on("connection", async (socket) => {
    const roomID = socket["roomID"];
    debugLog("socket connected:", socket.id, "userID:", socket["userID"], "roomID:", roomID);
    try {
      await pubClient.hset(`room:${roomID}`, socket.id, JSON.stringify([socket["userID"], "drumkit"]));
      await pubClient.persist(`room:${roomID}`);

      socket.join(roomID);

      const roomState = parseRoomState(await pubClient.hgetall(`room:${roomID}`));
      debugLog("emitting users-update on connect:", JSON.stringify(roomState));
      io.to(roomID).emit(
        "users-update",
        roomState,
        `${socket.id} joined room ${roomID}`
      );
    } catch (err) {
      console.error("Redis error on connection:", err);
      socket.disconnect();
    }

    socket.on(
      "play-sound",
      (sample: string, roomID: UserStateStore["roomID"]) => {
        socket.to(roomID).emit("sound-played", socket["userID"], sample);
      }
    );

    socket.on(
      "change-instrument",
      async (instrument: User["instrument"], roomID: UserStateStore["roomID"]) => {
        try {
          await pubClient.hset(`room:${roomID}`, socket.id, JSON.stringify([socket["userID"], instrument]));
          const roomState = parseRoomState(await pubClient.hgetall(`room:${roomID}`));
          io.to(roomID).emit(
            "users-update",
            roomState,
            `${socket["userID"]} changed instruments`
          );
        } catch (err) {
          console.error("Redis error on change-instrument:", err);
          socket.disconnect();
        }
      }
    );

    socket.on("disconnect", async (reason) => {
      socket.removeAllListeners();
      const roomID = socket["roomID"];
      try {
        await pubClient.hdel(`room:${roomID}`, socket.id);
        const remaining = await pubClient.hlen(`room:${roomID}`);
        if (remaining === 0) {
          await pubClient.expire(`room:${roomID}`, 60);
        }
        const roomState = parseRoomState(await pubClient.hgetall(`room:${roomID}`));
        io.to(roomID).emit(
          "users-update",
          roomState,
          `${socket.id} left room ${roomID}`
        );
      } catch (err) {
        console.error("Redis error on disconnect:", err);
      }
    });
  });

  res.end();
};

export default SocketHandler;
