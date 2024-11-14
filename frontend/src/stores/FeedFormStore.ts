import { create } from "zustand";
import { getMediaEltKey } from "../utils/medias";
import { Post, PostMediaFileType } from "../types/interfaces";

export type MediaFileType = { data: File; id: string };

interface State {
  files: MediaFileType[];
  postToUpdate: Post | undefined;
}

interface Actions {
  addFiles: (files: File[] | FileList | null) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  addPostToUpdate: (post: State["postToUpdate"]) => void;
  deleteImageFromPostToUpdate: (image_id: string) => void;
}

const useFeedFormStore = create<State & Actions>()((set) => ({
  files: [],
  postToUpdate: undefined,
  addFiles(files) {
    set((state) => {
      if (!files) return state;

      const newFiles = Array.from(files).map((file) => {
        return { data: file, id: getMediaEltKey(file) };
      });

      return { ...state, files: [...newFiles, ...state.files] };
    });
  },
  removeFile(id) {
    set((state) => {
      return {
        ...state,
        files: state.files.filter((file) => {
          return file.id !== id;
        }),
      };
    });
  },
  clearFiles() {
    set((state) => ({ ...state, files: [] }));
  },
  addPostToUpdate(post) {
    set((state) => ({ ...state, postToUpdate: post }));
  },

  deleteImageFromPostToUpdate(image_id) {
    set((state) => {
      const updatedMediaFiles = state.postToUpdate!.mediaFiles.filter(
        (file) => {
          return (file as PostMediaFileType).public_id !== image_id;
        }
      ) as PostMediaFileType[];

      return {
        ...state,
        postToUpdate: { ...state.postToUpdate!, mediaFiles: updatedMediaFiles },
      };
    });
  },
}));

export default useFeedFormStore;
