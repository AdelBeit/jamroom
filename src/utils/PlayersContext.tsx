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
import { connectSocket, socket, socketCleanup } from "./socketClient";
import { generateName, playWithVolume, flattenSamples } from "./utils";
import { useSound } from "./useSound";
import { usePage } from "./usePage";
import { useUsers } from "./useUsers";
import { Sample } from "../samples";

interface PlayersContext {
  players: Players | null;
  samples: Sample[] | [];
  setSamples(samples: Sample[]): void;
}

const defaultState = {
  players: null,
  samples: [],
  setSamples: (samples: Sample[]) => {},
};

const PlayersContext = createContext<PlayersContext>(defaultState);
export const usePlayers = () => useContext(PlayersContext);

// TODO: drag events cancel sample play

export const PlayersContextProvider = (props: PropsWithChildren<{}>) => {
  const players: MutableRefObject<null | Players> = useRef(null);
  const page = usePage((state) => state.page);
  const [setRoomID, setUsers, setUserID] = useUsers((state) => [
    state.setRoomID,
    state.setUsers,
    state.setUserID,
  ]);
  // const { roomID } = router.query;
  const userID = generateName();
  // @ts-ignore
  const [samples, setSamples] = useState(defaultState.samples as State[]);
  const setPadSample = useSound((state) => state.setPadSample);

  const handler = async () => {
    Tone.start();
  };

  const loadSamples = (samples) => {
    const allSamples = flattenSamples(samples);

    [...Array(10)].map((i) => setPadSample(i, "House Toms"));
    players.current = new Players(allSamples, () => {}).toDestination();
  };

  useEffect(() => {
    // create room if it doesn't exist
    // if (!roomID && router.isReady) {
    // router.replace(`/home?roomID=${Date.now()}`);
    // }

    // if (!roomID) return;
    if (Object.keys(samples).length === 0) return;
    loadSamples(samples);
  }, [samples]);

  useEffect(() => {
    let roomID = "1";
    if (!players.current) return;

    connectSocket(userID, roomID);

    socket.on("connect", () => {
      setRoomID(roomID);
      setUserID(userID);
    });

    socket.on("sound-played", (userID, sample) => {
      const player = players!.current!.player(sample);
      const users = useUsers.getState().users;
      const volume = (users[userID] && users[userID].volume) || -10;
      playWithVolume(player, volume);
    });

    socket.on("users-update", (users, msg) => {
      const oldUsers = useUsers.getState().users;
      const newUsers = {};
      Object.keys(users).map(
        (id) =>
          (newUsers[id] = {
            instrument: users[id][1],
            volume: (oldUsers[id] && oldUsers[id].volume) || -10,
          })
      );
      setUsers(newUsers);
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
      {/* {screen == "start" && (
        <div className={"page_container"}>
          <Button variant={"start"} handler={handler}></Button>
        </div>
      )} */}
    </PlayersContext.Provider>
  );
};
