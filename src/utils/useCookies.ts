import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CookiesStateStore {
   firstTime: boolean;
   setFirstTime(b: boolean): void;
}

export const useCookies = create<CookiesStateStore>()(
   devtools((set) => ({
      firstTime: true,
      setFirstTime: (b) => set(state => ({ firstTime: b })),
   }))
);