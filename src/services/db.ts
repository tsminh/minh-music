import { openDB } from "idb";

export const dbPromise = openDB("music-library", 1, {
  upgrade(db) {
    db.createObjectStore("songs", {
      keyPath: "id",
    });
  },
});
