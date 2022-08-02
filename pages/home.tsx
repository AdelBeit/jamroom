import React, { useEffect, useRef, MutableRefObject } from "react";
import Drums from "../src/screens/Drums";
import Keys from "../src/screens/Keys";
import SoundClips from "../src/screens/dropdowns/SoundClips";
import Users from "../src/screens/dropdowns/Users";
import DrumSelector from "../src/screens/dropdowns/DrumSelector";
import { useScreenStore, useUserStore } from "../src/utils/stores";
import { Players } from "tone";
import soundFiles from "../src/utils/data/soundFiles";
import { NextPage } from "next";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { Instrument, User } from "../src/types";
import { generateName } from "../src/utils/utils";

export let socket: Socket;
// TODO: extract context into it's own file
export const usePlayers = () => React.useContext(PlayersContext);
const PlayersContext = React.createContext<Players | null>(null);
const PlayersContextProvider = (props: React.PropsWithChildren<{}>) => {
  const players: MutableRefObject<null | Players> = useRef(null);
  const router = useRouter();
  const { roomID } = router.query;
  const screen = useScreenStore((state) => state.selectedScreen);
  const startButton = useRef(null);
  const [addUser, removeUser, setUserInstrument, setRoomID] = useUserStore(
    (state) => [
      state.addUser,
      state.removeUser,
      state.setUserInstrument,
      state.setRoomID,
    ]
  );
  const userID = generateName();

  const handler = () => {
    useScreenStore.getState().setScreen("keys");
  };

  const startAudioContext = () => {
    // @ts-ignore
    startButton.current?.click();
  };

  const loadSamples = () => {
    // TODO: persist loaded samples
    players.current = new Players(soundFiles, () => {
      initializeSocket();
    }).toDestination();
  };

  const initializeSocket = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.emit("join-room", roomID, userID, "keys");

    socket.on("connect", () => {
      console.log(socket.id, "connected");
    });

    // TEST: keep track of users joining and leaving
    socket.on("player-joined", (userID: User["id"], instrument: Instrument) => {
      addUser(userID, instrument, 100);
    });

    socket.on("player-left", (userID: User["id"]) => {
      removeUser(userID);
    });

    socket.on("sound-played", (clipName) => {
      console.log("received event", clipName);
      // TODO: pass volume before playing
      players?.current?.player(clipName).start();
    });

    socket.on(
      "instrument-changed",
      (userID: User["id"], instrument: Instrument) => {
        setUserInstrument(userID, instrument);
      }
    );
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

  return (
    <PlayersContext.Provider value={players.current}>
      {props.children}
      {screen == "start" && (
        <button
          style={{ visibility: "hidden" }}
          ref={startButton}
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
      <SoundClips soundClips={soundClips} />
      <DrumSelector />
    </PlayersContextProvider>
  );
};

export default Page;
