import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Page } from "../types";

export interface PageStateStore {
  page: Page;
  setPage(page: Page): void;
  menuOpen: boolean;
  toggleMenu(): void;
  closeMenu(): void;
  tutorialOpen: boolean;
  toggleTutorial(): void;
  jammersModalOpen: boolean;
  openJammersModal(): void;
  closeJammersModal(): void;
}

export const usePage = create<PageStateStore>()(
  devtools((set) => ({
    page: "_Loading",
    setPage: (page: Page) => set({ page }),
    menuOpen: false,
    toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
    closeMenu: () => set({ menuOpen: false }),
    tutorialOpen: false,
    toggleTutorial: () =>
      set((state) => ({ tutorialOpen: !state.tutorialOpen })),
    jammersModalOpen: false,
    openJammersModal: () => set({ jammersModalOpen: true }),
    closeJammersModal: () => set({ jammersModalOpen: false }),
  }))
);
