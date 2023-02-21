import create from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../types";

export interface UserStateStore {
  roomID: string;
  userID: User["id"];
  users: {
    [user: User["id"]]: { instrument: User["instrument"]; volume: number };
  };
  setRoomID(roomID: UserStateStore["roomID"]): void;
  setUsers(users: UserStateStore["users"]): void;
  setUserID(userID: User["id"]): void;
  setVolume(userID: User["id"], volume: number): void;
}

export const useUsers = create<UserStateStore>()(
  devtools((set) => ({
    roomID: "",
    userID: "",
    users: {},
    setRoomID: (roomID) => set({ roomID }),
    setUsers: (users) => set({ users }),
    setUserID: (userID) => set({ userID }),
    setVolume: (userID, volume) =>
      set((state) => ({
        users: {
          ...state.users,
          userID: { ...state.users[userID], ...{ volume } },
        },
      })),
  }))
);
