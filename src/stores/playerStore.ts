import { create } from "zustand";

export const usePlayerStore = create<{
  songs: any[];
  currentSong: any;
  setSongs: (songs: any[]) => void;
  setCurrentSong: (song: any) => void;
  loop: boolean;
  setLoop: (loop: boolean) => void;
  toggleLoop: () => void;
}>((set) => ({
  songs: [],
  currentSong: null,

  setSongs: (songs) => set({ songs }),

  setCurrentSong: (song) =>
    set({
      currentSong: song,
    }),
  loop: false,

  setLoop: (loop) => set({ loop }),

  toggleLoop: () =>
    set((state) => ({
      loop: !state.loop,
    })),
}));
