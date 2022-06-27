import { useEffect } from "react";

import { isBrowser } from "utils/RenderUtils";
import { dLog } from "utils/DebugUtils";

let video: HTMLVideoElement | null = null;

if (isBrowser() && video === null) {
  video = document.createElement("video");

  // For supporting playing without user interaction.
  video.muted = true;

  dLog("Created the video element.");
}

/**
 * Hook for creating a video from the media stream.
 */
export default function useVideo(
  mediaStream: MediaStream | undefined,
  onPlay: (video: HTMLVideoElement) => void
) {
  useEffect(() => {
    if (video === null) {
      return;
    }

    if (typeof mediaStream === "undefined") {
      return;
    }

    video.srcObject = mediaStream;

    video.oncanplaythrough = () => {
      if (video === null) {
        return;
      }

      onPlay(video);
    };

    video.play();
  }, [mediaStream, onPlay]);

  return { video };
}
