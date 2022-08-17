import React, { useEffect, useRef, MutableRefObject } from "react";
import Drums from "../src/screens/Drums";
import Keys from "../src/screens/Keys";
import Users from "../src/screens/dropdowns/Users";
import DrumSelector from "../src/screens/dropdowns/DrumSelector";
import {
  useScreenStore,
  useUserStore,
  useVolumeStore,
} from "../src/utils/stores";
import { Players } from "tone";
import soundFiles from "../src/utils/data/soundFiles";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { UserStateStore } from "../src/types";
import { generateName, playWithVolume } from "../src/utils/utils";
import {
  connectSocket,
  socket,
  socketCleanup,
} from "../src/utils/socketClient";
import * as Tone from "tone";

// TODO: make sound play on touch start not touch end
// TODO: drag events cancel sample play

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
  const [setVolumes, userVolumes] = useVolumeStore((state) => [
    state.setVolumes,
    state.userVolumes,
  ]);
  const router = useRouter();
  const { roomID } = router.query;
  const userID = generateName();

  const handler = async () => {
    await Tone.start();
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
    if (!players.current) return;

    connectSocket(userID, roomID);

    socket.on("connect", () => {
      setRoomID(roomID as UserStateStore["roomID"]);
      setUserID(userID);
    });

    socket.on("sound-played", (userID, clipName) => {
      console.log("received event", clipName);
      // TODO: pass volume before playing
      const player = players!.current!.player(clipName);
      const volume = userVolumes[userID];
      playWithVolume(player, volume);
      // const oldVolume = player.volume.value;
      // const volume = userVolumes[userID];
      // player.volume.value = volume;
      // player.start();
      // player.volume.value = oldVolume;
    });

    socket.on("users-update", (users, msg) => {
      setUsers(users);
      setVolumes(users);
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
