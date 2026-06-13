import { parseBlob } from "music-metadata-browser";

export async function extractMetadata(file: File) {
  const metadata = await parseBlob(file);

  let artwork;

  const pic = metadata.common.picture?.[0];

  if (pic) {
    const blob = new Blob([new Uint8Array(pic.data)], {
      type: pic.format,
    });

    artwork = URL.createObjectURL(blob);
  }

  return {
    title: metadata.common.title || file.name.replace(/\.[^/.]+$/, ""),

    artist: metadata.common.artist,

    artwork,

    duration: metadata.format.duration,
  };
}
