import WaveSurfer from "wavesurfer.js";
import { useEffect, useRef } from "react";

export default function Waveform({ audio }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ws = WaveSurfer.create({
      container: ref.current,
      media: audio,
      height: 80,
    });

    return () => ws.destroy();
  }, []);

  return <div ref={ref} />;
}
