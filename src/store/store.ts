import { create } from "zustand";

interface BearState {
  isUserLoggedIn: boolean;
  email: string;
  setIsUserLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
}

export const useBearStore = create<BearState>((set) => ({
  isUserLoggedIn: false,
  email: "",
  setIsUserLoggedIn: (isLoggedIn) =>
    set({ isUserLoggedIn: isLoggedIn }),
  setEmail: (email) => set({ email }),
}));