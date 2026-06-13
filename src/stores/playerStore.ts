import { create } from "zustand";

export const usePlayerStore = create<{
  songs: any[];
  currentSong: any;
  setSongs: (songs: any[]) => void;
  setCurrentSong: (song: any) => void;
}>((set) => ({
  songs: [],
  currentSong: null,

  setSongs: (songs) => set({ songs }),

  setCurrentSong: (song) =>
    set({
      currentSong: song,
    }),
}));
