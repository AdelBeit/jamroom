import { useRouter } from "next/router";
import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Players } from "tone";
import * as Tone from "tone";
import { Button } from "../components/Button";
import { samples, UserStateStore } from "../types";
import { connectSocket, socket, socketCleanup } from "./socketClient";
import {
  useScreenStore,
  useSoundStore,
  useUserStore,
  useVolumeStore,
} from "./stores";
import { generateName, playWithVolume, flattenSamples } from "./utils";

interface PlayersContext {
  players: Players | null;
  samples: samples;
  setSamples(samples: samples): void;
}

const defaultState = {
  players: null,
  samples: {},
  setSamples: () => {},
};

const PlayersContext = createContext<PlayersContext>(defaultState);
export const usePlayers = () => useContext(PlayersContext);

// CHECK: make sound play on touch start not touch end
// TODO: drag events cancel sample play

export const PlayersContextProvider = (props: PropsWithChildren<{}>) => {
  const players: MutableRefObject<null | Players> = useRef(null);
  const screen = useScreenStore((state) => state.selectedScreen);
  const [setRoomID, setUsers, setUserID] = useUserStore((state) => [
    state.setRoomID,
    state.setUsers,
    state.setUserID,
  ]);
  const setVolumes = useVolumeStore((state) => state.setVolumes);
  const router = useRouter();
  const { roomID } = router.query;
  const userID = generateName();
  // @ts-ignore
  const [samples, setSamples] = useState(defaultState.samples);
  const setDrumSound = useSoundStore((state) => state.setDrumSound);

  const handler = async () => {
    await Tone.start();
    useScreenStore.getState().setScreen("keys");
  };

  const loadSamples = (samples) => {
    const allSamples = flattenSamples(samples);
    setDrumSound("tom", Object.keys(samples["toms"])[0]);
    setDrumSound("snare", Object.keys(samples["snares"])[0]);
    setDrumSound("kick", Object.keys(samples["kicks"])[0]);
    setDrumSound("hi_hat", Object.keys(samples["hi_hats"])[0]);
    setDrumSound("closed_hat", Object.keys(samples["closed_hats"])[0]);
    players.current = new Players(allSamples, () => {}).toDestination();
  };

  useEffect(() => {
    // create room if it doesn't exist
    if (!roomID && router.isReady) {
      router.replace(`/home?roomID=${Date.now()}`);
    }

    if (!roomID) return;

    loadSamples(samples);
  }, [roomID, samples]);

  useEffect(() => {
    if (!players.current) return;

    connectSocket(userID, roomID);

    socket.on("connect", () => {
      setRoomID(roomID as UserStateStore["roomID"]);
      setUserID(userID);
    });

    socket.on("sound-played", (userID, clipName) => {
      const player = players!.current!.player(clipName);
      const volume = useVolumeStore.getState().userVolumes[userID] ?? -10;
      playWithVolume(player, volume);
    });

    socket.on("users-update", (users, msg) => {
      setUsers(users);
      setVolumes(users);
    });

    return socketCleanup;
  }, [players.current]);

  return (
    <PlayersContext.Provider
      value={{
        players: players.current,
        samples: samples,
        setSamples: setSamples,
      }}
    >
      {props.children}
      {screen == "start" && (
        <div className={"page_container"}>
          <Button variant={"start"} handler={handler} style="plain"></Button>
        </div>
      )}
    </PlayersContext.Provider>
  );
};
