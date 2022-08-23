import { useRouter } from "next/router";
import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Players } from "tone";
import * as Tone from "tone";
import { Button } from "../components/Button";
import { UserStateStore } from "../types";
import soundFiles from "./data/soundFiles";
import { connectSocket, socket, socketCleanup } from "./socketClient";
import { useScreenStore, useUserStore, useVolumeStore } from "./stores";
import { generateName, playWithVolume } from "./utils";

const PlayersContext = createContext<Players | null>(null);
export const usePlayers = () => useContext(PlayersContext);

// TODO: make sound play on touch start not touch end
// TODO: drag events cancel sample play
// CHECK: extract context into it's own file
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

  const handler = async () => {
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
    if (!players.current) return;

    connectSocket(userID, roomID);

    socket.on("connect", () => {
      setRoomID(roomID as UserStateStore["roomID"]);
      setUserID(userID);
    });

    socket.on("sound-played", (userID, clipName) => {
      // CHECK: pass volume before playing
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
    <PlayersContext.Provider value={players.current}>
      {props.children}
      {screen == "start" && (
        <div className={"page_container"}>
          <Button variant={"start"} handler={handler} style="plain"></Button>
        </div>
      )}
    </PlayersContext.Provider>
  );
};
