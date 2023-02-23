import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Page } from "../types";

export interface PageStateStore {
  page: Page;
  setPage(page: Page): void;
  menuOpen: boolean;
  toggleMenu(): void;
  tutorialOpen: boolean;
  toggleTutorial(): void;
}

export const usePage = create<PageStateStore>()(
  devtools((set) => ({
    page: "_Lobby",
    setPage: (page: Page) => set({ page }),
    menuOpen: false,
    toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
    tutorialOpen: false,
    toggleTutorial: () =>
      set((state) => ({ tutorialOpen: !state.tutorialOpen })),
  }))
);
