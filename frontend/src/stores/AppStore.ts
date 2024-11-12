import { create } from "zustand";
import { User } from "../types/interfaces";
import { lsRead } from "../db/ls.io";
import { type Post } from "../types/interfaces";

export type ModalSectionType = "SETTINGS" | "PROFILE" | null;

interface State {
  auth: User | undefined;
  modalSection: ModalSectionType;
  posts: Post[];
}

interface Actions {
  setAuth: (user: State["auth"]) => void;
  setModal: (section: State["modalSection"]) => void;
  addPost: (post: Post) => void;
  addPosts: (posts: Post[]) => void;
  updatePosts: (post: Post) => void;
}

const useAppStore = create<State & Actions>()((set) => ({
  auth: lsRead<User>("socme-auth"),
  posts: [],
  setAuth(user) {
    set((state) => ({ ...state, auth: user }));
  },

  modalSection: null,
  setModal(section) {
    set((state) => ({ ...state, modalSection: section }));
  },

  addPost(post) {
    set((state) => ({ ...state, posts: [post, ...state.posts] }));
  },

  addPosts(posts) {
    set((state) => ({ ...state, posts: [...posts, ...state.posts] }));
  },

  // Must be used with a transition
  updatePosts(post) {
    set((state) => {
      const statePosts = [...state.posts];
      let idx = statePosts.findIndex((_post) => _post._id === post._id);

      if (idx === -1) return state;

      statePosts.splice(idx, 1, post);

      return { ...state, posts: statePosts };
    });
  },
}));

export default useAppStore;
