import { useRef } from "react";

export default function useCamera(args: { cameraType: "front" | "back" }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (typeof document !== "undefined" && videoRef.current === null) {
    videoRef.current = document.createElement("video");
  }

  const video = videoRef.current;

  if (video !== null) {
    (async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode:
            args.cameraType === "back" ? { exact: "environment" } : "user",
        },
      });

      video.srcObject = mediaStream;
    })();
  }

  return { videoRef };
}
