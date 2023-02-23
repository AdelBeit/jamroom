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
  const [setRoomID, roomID, setUsers, setUserID] = useUsers((state) => [
    state.setRoomID,
    state.roomID,
    state.setUsers,
    state.setUserID,
  ]);
  const userID = generateName();
  const [samples, setSamples] = useState(defaultState.samples as Sample[]);

  const loadSamples = (samples) => {
    const allSamples = flattenSamples(samples);
    players.current = new Players(allSamples, () => {}).toDestination();
  };

  useEffect(() => {
    loadSamples(samples);
  }, [samples]);

  useEffect(() => {
    if (!players.current) return;
  }, [players.current]);

  useEffect(() => {
    if (!roomID) return;

    Tone.start();

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
      Object.keys(users).map((id) => {
        const [userID, instrument] = users[id];

        newUsers[userID] = {
          instrument: instrument,
          volume: (oldUsers[userID] && oldUsers[userID].volume) || -10,
        };
      });
      setUsers(newUsers);
    });

    return socketCleanup;
  }, [roomID]);

  return (
    <PlayersContext.Provider
      value={{
        ...{ samples, setSamples },
        playSample: playSample.bind(null, players.current),
        players: players.current, // TODO: eventually remove this
      }}
    >
      {props.children}
    </PlayersContext.Provider>
  );
};
