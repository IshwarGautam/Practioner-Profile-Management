import create from "zustand";

import { devtools, persist } from "zustand/middleware";

interface UserState {
  userInfo: {
    userName: string;
  };
  getUserInfo: (userInfo: object) => void;
}

const useUserStore = create(
  devtools(
    persist(
      (set): UserState => ({
        userInfo: { userName: "" },
        getUserInfo: (userInfo) => set({ userInfo }),
      }),
      {
        name: "userInfo",
      }
    )
  )
);

export default useUserStore;
