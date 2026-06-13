import { extractMetadata } from "./artwork";

class MusicPlayer {
  audio = new Audio();

  async play(file: File) {
    const url = URL.createObjectURL(file);

    this.audio.src = url;

    await this.audio.play();

    const song = await extractMetadata(file);

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
  }

  setLoop(loop: boolean) {
    this.audio.loop = loop;
  }

  pause() {
    this.audio.pause();
  }

  resume() {
    this.audio.play();
  }
}

export const musicPlayer = new MusicPlayer();
