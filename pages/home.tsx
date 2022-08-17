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
  initSocket,
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
    useScreenStore.getState().setScreen("starting");
    await Tone.start();
    useScreenStore.getState().setScreen("keys");
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

    loadSamples();
  }, [roomID]);

  useEffect(() => {
    // console.log(`players ref: ${players}, players.current: ${players.current}`);
    if (!players.current) return;
    // console.log(`wasn't null`);

    connectSocket(userID, roomID);

    socket.on("connect", () => {
      setRoomID(roomID as UserStateStore["roomID"]);
      setUserID(userID);
    });

    initSocket();

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
      console.log(msg);
      console.log(users);
      setUsers(users);
      setVolumes(users);
    });

    return socketCleanup;
  }, [players.current]);

  return (
    <PlayersContext.Provider value={players.current}>
      {"start" && props.children}
      {(screen == "start" || screen === "starting") && (
        <div
          style={{
            position: "absolute",
            inset: "0 0 0 0",
            justifyContent: "center",
            alignItems: "center",
            cursor: screen === "start" ? "pointer" : "loading",
            zIndex: 100,
            backdropFilter: "blur(3px)",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
          onClick={screen === "start" ? handler : undefined}
          role="button"
          tabIndex={0}
          aria-label="start"
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {screen === "start" ? "Click to start" : "Loading.."}
          </span>
        </div>
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
      {(screen == "keys" || screen == "start") && <Keys />}
      {screen == "drums" && <Drums />}
      <Users />
      {/* <SoundClips soundClips={soundClips} /> */}
      <DrumSelector />
    </PlayersContextProvider>
  );
};

export default Page;
