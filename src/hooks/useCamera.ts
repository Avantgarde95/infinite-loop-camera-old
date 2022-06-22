import adapter from "webrtc-adapter";

import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { isBrowser } from "utils/RenderUtils";
import { dError, dLog } from "utils/DebugUtils";
import { camerasState, currentCameraIndexState } from "states/Camera";

let video: HTMLVideoElement | undefined = undefined;
let cameraInfos: Array<{ label: string; mediaStream: MediaStream }> = [];

async function createVideo() {
  if (isBrowser() && typeof video === "undefined") {
    video = document.createElement("video");

    // For supporting playing without user interaction.
    video.muted = true;

    dLog("Created the video element.");
  }
}

async function createCameras() {
  if (!isBrowser()) {
    return;
  }

  if (cameraInfos.length > 0) {
    return;
  }

  const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (device) => device.kind === "videoinput"
  );

  cameraInfos = [];

  for (const device of devices) {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: device.deviceId,
        },
      });

      cameraInfos.push({ label: device.label, mediaStream });
    } catch (error) {
      dError(error);
    }
  }
}

export default function useCamera(args: {
  onPlay: (video: HTMLVideoElement) => void;
  onFrame: (video: HTMLVideoElement) => void;
}) {
  const [cameras, setCameras] = useRecoilState(camerasState);
  const currentCameraIndex = useRecoilValue(currentCameraIndexState);

  useEffect(
    () => {
      (async () => {
        await createVideo();
        await createCameras();

        setCameras(cameraInfos.map((info) => ({ label: info.label })));
      })();
    },
    // TODO: Avoid dependency hack.
    []
  );

  useEffect(() => {
    if (typeof video === "undefined") {
      return;
    }

    if (currentCameraIndex >= cameraInfos.length) {
      return;
    }

    video.pause();
    video.srcObject = cameraInfos[currentCameraIndex].mediaStream;

    video.oncanplaythrough = () => {
      if (typeof video === "undefined") {
        return;
      }

      args.onPlay(video);
    };

    video.play();
  }, [cameras, currentCameraIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof video === "undefined") {
        return;
      }

      args.onFrame(video);
    }, 1000 / 30);

    return () => {
      clearInterval(interval);
    };
  }, [video, args.onFrame]);

  return { video };
}
