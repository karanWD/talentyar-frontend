"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

type VideoPlayerProps = {
  src: string;
};

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-cover"
        muted
        playsInline
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        onClick={togglePlay}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Play / Pause Center Button */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30"
        >
          <span className="flex size-10.5 cursor-pointer items-center justify-center rounded-full bg-black/30">
            <Play
              strokeWidth={0}
              size={20}
              fill="white"
              className="text-white"
            />
          </span>
        </button>
      )}

      {/* Bottom Controls */}
      <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
        <button onClick={toggleMute} className="cursor-pointer text-white">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={22} />}
        </button>
      </div>
    </div>
  );
}
