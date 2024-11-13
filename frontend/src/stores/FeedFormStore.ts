import { create } from "zustand";
import { getMediaEltKey } from "../utils/medias";

export type MediaFileType = { data: File; id: string };

interface State {
  files: MediaFileType[];
}

interface Actions {
  addFiles: (files: File[] | FileList | null) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
}

const useFeedFormStore = create<State & Actions>()((set) => ({
  files: [],
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
}));

export default useFeedFormStore;
