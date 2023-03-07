import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../types";

export interface UserStateStore {
  roomID: string;
  userID: User["id"];
  users: {
    [user: User["id"]]: { instrument: User["instrument"]; volume: number };
  };
  nowJamming: { [user: User["id"]]: NodeJS.Timeout };
  setNowJamming(userID: User["id"]): void;
  deleteNowJamming(userID: User["id"]): void;
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
    nowJamming: {},
    setNowJamming: (userID) =>
      set((state) => {
        if (state.nowJamming[userID]) clearTimeout(state.nowJamming[userID]);
        const timeout = setTimeout(() => {
          useUsers.getState().deleteNowJamming(userID);
        }, 1200);
        return { nowJamming: { ...state.nowJamming, [userID]: timeout } };
      }),
    deleteNowJamming: (userID) =>
      set((state) => {
        if (state.nowJamming[userID]) delete state.nowJamming[userID];
        return { ...state.nowJamming };
      }),
    setRoomID: (roomID) => set({ roomID }),
    setUsers: (users) =>
      set((state) => {
        let newUsers = { ...users, ...state.users };
        if (Object.keys(users).length < Object.keys(state.users).length) {
          Object.keys(state.users).map((oldUserID) => {
            if (!users[oldUserID]) delete newUsers[oldUserID];
          });
        }

        return { users: newUsers };
      }),
    setUserID: (userID) => set({ userID }),
    setVolume: (userID, volume) =>
      set((state) => ({
        users: {
          ...state.users,
          [userID]: { ...state.users[userID], ...{ volume } },
        },
      })),
  }))
);
