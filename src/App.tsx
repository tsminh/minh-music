import { useEffect, useState } from "react";

import ImportMusic from "./components/ImportMusic";
import MusicList from "./components/MusicList";
import PlayerBar from "./components/PlayerBar";

import { dbPromise } from "./services/db";
import { musicPlayer } from "./services/musicPlayer";

export default function App() {
  const [songs, setSongs] = useState<any[]>([]);

  const loadSongs = async () => {
    const db = await dbPromise;

    const all = await db.getAll("songs");

    setSongs(all);
  };

  useEffect(() => {
    loadSongs();
  }, []);

  const playSong = async (song: any) => {
    await musicPlayer.play(song.file);

    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.title,
      artist: song.artist,
      artwork: song.artwork
        ? [
            {
              src: song.artwork,
              sizes: "512x512",
              type: "image/png",
            },
          ]
        : [],
    });
  };

  return (
    <>
      <ImportMusic refresh={loadSongs} />

      <MusicList songs={songs} onSelect={playSong} />

      <PlayerBar />
    </>
  );
}
