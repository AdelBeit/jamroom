import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CookiesStateStore {
  visited: boolean;
  setVisited(b: boolean): void;
}

export const useCookies = create<CookiesStateStore>()(
  devtools((set) => ({
    visited: false,
    setVisited: (b) => set((state) => ({ visited: b })),
  }))
);
