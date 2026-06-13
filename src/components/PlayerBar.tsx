import { IconButton, Slider } from "@mui/material";

import { useEffect, useState } from "react";
import { musicPlayer } from "../services/musicPlayer";
import { usePlayerStore } from "../stores/playerStore";

export default function PlayerBar() {
  const [position, setPosition] = useState(0);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = musicPlayer.audio;

    const timer = setInterval(() => {
      setPosition(audio.currentTime);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const loop = usePlayerStore((state) => state.loop);

  const toggleLoop = usePlayerStore((state) => state.toggleLoop);

  useEffect(() => {
    musicPlayer.setLoop(loop);
  }, [loop]);

  return (
    <>
      <Slider
        value={position}
        max={musicPlayer.audio.duration || 0}
        onChange={(_, value) => {
          musicPlayer.audio.currentTime = value as number;
        }}
      />

      <IconButton
        onClick={() => {
          if (playing) {
            musicPlayer.pause();
          } else {
            musicPlayer.resume();
          }

          setPlaying(!playing);
        }}
      >
        {playing ? "PAUSE" : "PLAY"}
      </IconButton>
      <IconButton onClick={toggleLoop} color={loop ? "primary" : "default"}>
        LOOP
      </IconButton>
    </>
  );
}
