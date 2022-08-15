import React, { useEffect, useRef, MutableRefObject, useState } from "react";
import Drums from "../src/screens/Drums";
import Keys from "../src/screens/Keys";
import SoundClips from "../src/screens/dropdowns/SoundClips";
import Users from "../src/screens/dropdowns/Users";
import DrumSelector from "../src/screens/dropdowns/DrumSelector";
import { useScreenStore, useUserStore } from "../src/utils/stores";
import { Players } from "tone";
import soundFiles from "../src/utils/data/soundFiles";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { UserStateStore } from "../src/types";
import { generateName } from "../src/utils/utils";
import {
  connectSocket,
  initSocket,
  socket,
  socketCleanup,
} from "../src/utils/socketClient";

// TODO: extract context into it's own file
export const usePlayers = () => React.useContext(PlayersContext);
const PlayersContext = React.createContext<Players | null>(null);
const PlayersContextProvider = (props: React.PropsWithChildren<{}>) => {
  const players: MutableRefObject<null | Players> = useRef(null);
  const screen = useScreenStore((state) => state.selectedScreen);
  const initAudioContext = useRef(null);
  const [setRoomID, setUsers, setUserID] = useUserStore((state) => [
    state.setRoomID,
    state.setUsers,
    state.setUserID,
  ]);
  const router = useRouter();
  const { roomID } = router.query;
  const userID = generateName();

  const handler = () => {
    useScreenStore.getState().setScreen("keys");
  };

  const startAudioContext = () => {
    // @ts-ignore
    initAudioContext.current?.click();
  };

  const loadSamples = () => {
    // TODO: persist loaded samples
    players.current = new Players(soundFiles, () => {}).toDestination();
  };

  useEffect(() => {
    // create room if it doesn't exist
    if (!roomID && router.isReady) {
      router.replace(`/home?roomID=${Date.now()}`);
    }

    if (!roomID) return;

    startAudioContext();
    loadSamples();
  }, [roomID]);

  useEffect(() => {
    // console.log(`players ref: ${players}, players.current: ${players.current}`);
    if (!players.current) return;
    // console.log(`wasn't null`);

    connectSocket(userID, roomID);
    setUserID(userID);

    socket.on("connect", () => {
      setRoomID(roomID as UserStateStore["roomID"]);
    });

    initSocket();

    socket.on("sound-played", (clipName) => {
      console.log("received event", clipName);
      // TODO: pass volume before playing
      players?.current?.player(clipName).start();
    });

    socket.on("users-update", (users, msg) => {
      setUsers(users);
    });

    return socketCleanup;
  }, [players.current]);

  return (
    <PlayersContext.Provider value={players.current}>
      {props.children}
      {screen == "start" && (
        <button
          style={{ visibility: "hidden" }}
          ref={initAudioContext}
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

  return (
    <PlayersContextProvider>
      {screen == "keys" && <Keys />}
      {screen == "drums" && <Drums />}
      <Users />
      {/* <SoundClips soundClips={soundClips} /> */}
      <DrumSelector />
    </PlayersContextProvider>
  );
};

export default Page;
