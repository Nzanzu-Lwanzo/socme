import { create } from "zustand";
import { User } from "../types/interfaces";

export type ModalSectionType = "SETTINGS" | "PROFILE" | null;

interface State {
  auth: User | undefined;
  modalSection: ModalSectionType;
}

interface Actions {
  setAuth: (user: User) => void;
  setModal: (section: State["modalSection"]) => void;
}

const useAppStore = create<State & Actions>()((set) => ({
  auth: undefined,
  setAuth(user) {
    set((state) => ({ ...state, auth: user }));
  },

  modalSection: null,
  setModal(section) {
    set((state) => ({ ...state, modalSection: section }));
  },
}));

export default useAppStore;
