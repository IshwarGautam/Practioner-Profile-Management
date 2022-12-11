import create from "zustand";

import { devtools, persist } from "zustand/middleware";

interface UserState {
  userName: string;
  getActiveUserName: (userName: string) => void;
}

const useUserStore = create(
  devtools(
    persist(
      (set): UserState => ({
        userName: "",
        getActiveUserName: (userName) => set({ userName }),
      }),
      {
        name: "userName",
      }
    )
  )
);

export default useUserStore;
