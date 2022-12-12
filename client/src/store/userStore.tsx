import create from "zustand";

import { devtools, persist } from "zustand/middleware";

interface UserState {
  userInfo: {};
  getUserInfo: (userInfo: object) => void;
}

const useUserStore = create(
  devtools(
    persist(
      (set): UserState => ({
        userInfo: {},
        getUserInfo: (userInfo) => set({ userInfo }),
      }),
      {
        name: "userInfo",
      }
    )
  )
);

export default useUserStore;
