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
import { generateName, flattenSamples } from "./utils";
import playSample from "./playSample";
import { useSound } from "./useSound";
import { useUsers } from "./useUsers";
import { Sample } from "../sample";
import { User } from "../types";

export interface PlayersContext {
  players: Players | null;
  samples: Sample[] | [];
  setSamples(samples: Sample[]): void;
  playSample(sample: Sample, userID?: User["id"]): void;
}

const defaultState = {
  players: null,
  samples: [],
  setSamples: (samples: Sample[]) => {},
  playSample: (sample: Sample, userID?: User["id"]) => {},
};

const PlayersContext = createContext<PlayersContext>(defaultState);
export const usePlayers = () => useContext(PlayersContext);

export const PlayersContextProvider = (props: PropsWithChildren<{}>) => {
  const players: MutableRefObject<null | Players> = useRef(null);
  const [setRoomID, setUsers, setUserID] = useUsers((state) => [
    state.setRoomID,
    state.setUsers,
    state.setUserID,
  ]);
  const userID = generateName();
  const [samples, setSamples] = useState(defaultState.samples as Sample[]);

  const handler = async () => {
    Tone.start();
  };

  const loadSamples = (samples) => {
    const allSamples = flattenSamples(samples);
    players.current = new Players(allSamples, () => {}).toDestination();
  };

  useEffect(() => {
    // create room if it doesn't exist
    // if (!roomID && router.isReady) {
    // router.replace(`/home?roomID=${Date.now()}`);
    // }

    // if (!roomID) return;
    // if (Object.keys(samples).length === 0) return;
    loadSamples(samples);
  }, []);

  useEffect(() => {
    let roomID = "1";
    if (!players.current) return;

    connectSocket(userID, roomID);

    socket.on("connect", () => {
      setRoomID(roomID);
      setUserID(userID);
    });

    socket.on("sound-played", (userID, sample) => {
      playSample.bind(null, players!.current!)(sample, userID);
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
        ...{ samples, setSamples },
        playSample: playSample.bind(null, players.current),
        players: players.current, // TODO: eventually remove this
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
