import { create } from "zustand";
import { User } from "../types/interfaces";
import { lsRead } from "../db/ls.io";

export type ModalSectionType = "SETTINGS" | "PROFILE" | null;

interface State {
  auth: User | undefined;
  modalSection: ModalSectionType;
}

interface Actions {
  setAuth: (user: State["auth"]) => void;
  setModal: (section: State["modalSection"]) => void;
}

const useAppStore = create<State & Actions>()((set) => ({
  auth: lsRead<User>("socme-auth"),
  setAuth(user) {
    set((state) => ({ ...state, auth: user }));
  },

  modalSection: null,
  setModal(section) {
    set((state) => ({ ...state, modalSection: section }));
  },
}));

export default useAppStore;
