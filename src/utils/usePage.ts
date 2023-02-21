import create from "zustand";
import { devtools } from "zustand/middleware";
import { Page } from "../types";

export interface PageStateStore {
  page: Page;
  setPage: (page: Page) => void;
}

export const usePage = create<PageStateStore>()(
  devtools((set) => ({
    page: "_Lobby",
    setPage: (page: Page) => set({ page }),
  }))
);
