import { create } from "zustand";
import { User } from "../types/interfaces";
import { lsRead } from "../db/ls.io";
import { type Post } from "../types/interfaces";

export type ModalSectionType = "SETTINGS" | "UPDATE_POST_FORM" | null;

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
  deletePost: (id: string) => void;
  setPosts: (posts: Post[]) => void;
  deletePostComment: (postId: string, commentId: string) => void;
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

  // Must be used with a transition
  deletePost(id) {
    set((state) => {
      return { ...state, posts: state.posts.filter((post) => post._id !== id) };
    });
  },

  // Must be used with a transition
  setPosts(posts) {
    set((state) => ({ ...state, posts }));
  },

  // Must be used with a transition
  deletePostComment(postId, commentId) {
    set((state) => {
      const postsCopy = [...state.posts];

      // Find the post and remove the deleted comment
      const postFound = state.posts.find((post) => post._id === postId);

      if (!postFound) return state;

      const filteredComments =
        postFound?.comments.filter((comment) => comment._id !== commentId) ||
        [];

      // Replace the post itself
      const updatedPost = { ...postFound, comments: filteredComments };
      let idx = state.posts.findIndex((post) => post._id === postId);
      postsCopy.splice(idx, 1, updatedPost);

      return { ...state, posts: postsCopy };
    });
  },
}));

export default useAppStore;
