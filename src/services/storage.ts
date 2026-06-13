// services/storage.ts

import { dbPromise } from "./db";

export async function getStorageStats() {
  const db = await dbPromise;
  const songs = await db.getAll("songs");

  const totalBytes = songs.reduce(
    (sum, song) => sum + (song.audioBlob?.size || 0),
    0,
  );

  const estimate = await navigator.storage.estimate();

  return {
    totalSongs: songs.length,
    usedBytes: totalBytes,
    quotaBytes: estimate.quota || 0,
  };
}

export async function deleteSong(id: string) {
  const db = await dbPromise;

  await db.delete("songs", id);
}

export async function clearLibrary() {
  const db = await dbPromise;

  const tx = db.transaction("songs", "readwrite");

  await tx.store.clear();

  await tx.done;
}
