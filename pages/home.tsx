import React, { useEffect, useRef, MutableRefObject } from "react";
import Drums from "../src/screens/Drums";
import Keys from "../src/screens/Keys";
import SoundClips from "../src/screens/dropdowns/SoundClips";
import Users from "../src/screens/dropdowns/Users";
import DrumSelector from "../src/screens/dropdowns/DrumSelector";
import { useScreenStore, useSoundStore } from "../src/utils/stores";
import { Players } from "tone";
import soundFiles from "../src/utils/data/soundFiles";
import { NextPage } from "next";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/router";

export let socket: Socket;

const PlayersContext = React.createContext<Players | null>(null);
export const usePlayers = () => React.useContext(PlayersContext);
const PlayersContextProvider = (props: React.PropsWithChildren<{}>) => {
  const players: MutableRefObject<null | Players> = useRef(null);
  const router = useRouter();
  const { roomID } = router.query;
  const screen = useScreenStore((state) => state.selectedScreen);

  const handler = () => {
    useScreenStore.getState().setScreen("keys");
  };

  const startRef = useRef(null);

  useEffect(() => {
    if (!roomID && router.isReady) {
      // console.log("joining", roomID, typeof window);
      router.replace(`/home?roomID=${Date.now()}`, undefined, {
        shallow: true,
      });
    }
  }, [roomID]);

  // TODO: handle opening closing sockets for switching rooms
  useEffect(() => {
    if (!roomID) {
      return;
    }
    // @ts-ignore
    startRef.current?.click();
    players.current = new Players(soundFiles, () => {
      // console.log("samples loaded");
      socketInitializer();
    }).toDestination();
  }, [roomID]);

  const socketInitializer = async () => {
    await fetch(`/api/socket?roomID=${roomID}`, {
      headers: { "x-roomid": roomID as string },
    });
    socket = io();

    socket.on("connect", () => {
      console.log(socket.id, "connected");
    });

    socket.on("sound-played", (clipName) => {
      console.log("received event", clipName);
      players?.current?.player(clipName).start();
    });
  };

  return (
    <PlayersContext.Provider value={players.current}>
      {props.children}
      {screen == "start" && (
        <button
          style={{ visibility: "hidden" }}
          ref={startRef}
          onClick={handler}
        ></button>
      )}
    </PlayersContext.Provider>
  );
};

const Page: NextPage = () => {
  const screen = useScreenStore((state) => state.selectedScreen);
  const soundClips = [
    "Egyptian Drum",
    "Tuba",
    "French Horn",
    "Gothic Atmospheric",
    "Space Drum",
  ];
  const players = usePlayers();

  useEffect(() => {
    // socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log(socket.id, "connected");
    });

    socket.on("sound-played", (clipName) => {
      console.log(players, "received event");
      // players?.player(clipName).start();
    });
  };

  return (
    <PlayersContextProvider>
      {screen == "keys" && <Keys />}
      {screen == "drums" && <Drums />}
      <Users />
      <SoundClips soundClips={soundClips} />
      <DrumSelector />
    </PlayersContextProvider>
  );
};

export default Page;
