import adapter from "webrtc-adapter";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { isBrowser } from "utils/RenderUtils";
import { dError, dLog } from "utils/DebugUtils";
import { Camera, camerasState, currentCameraIndexState } from "states/Camera";

let video: HTMLVideoElement | undefined = undefined;

function createVideo() {
  if (isBrowser() && typeof video === "undefined") {
    video = document.createElement("video");

    // For supporting playing without user interaction.
    video.muted = true;

    dLog("Created the video element.");
  }
}

export default function useCamera(onPlay: (video: HTMLVideoElement) => void) {
  const [cameras, setCameras] = useRecoilState(camerasState);
  const currentCameraIndex = useRecoilValue(currentCameraIndexState);

  useEffect(() => {
    createVideo();
  }, []);

  useEffect(
    () => {
      (async () => {
        dLog("Stopping the existing tracks for safety...");

        for (const camera of cameras) {
          camera.mediaStream.getTracks().forEach((track) => track.stop());
        }

        const mediaDeviceInfos = (
          await navigator.mediaDevices.enumerateDevices()
        ).filter((mediaDeviceInfo) => mediaDeviceInfo.kind === "videoinput");

        dLog(
          `Got the cameras: ${mediaDeviceInfos
            .map((info) => `${info.deviceId}: ${info.label}`)
            .join(", ")}`
        );

        const newCameras: Array<Camera> = [];

        for (const mediaDeviceInfo of mediaDeviceInfos) {
          try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                deviceId: mediaDeviceInfo.deviceId,
              },
            });

            newCameras.push({ mediaDeviceInfo, mediaStream });
          } catch (error) {
            dError(error);
          }
        }

        dLog(
          `Retrieved the streams of ${newCameras
            .map((camera) => camera.mediaDeviceInfo.deviceId)
            .join(", ")}`
        );
        setCameras(newCameras);
      })();
    },
    // We don't put `cameras` in the dependency array.
    // Normally we can avoid this hack by using callback state setter.
    // But because of the awaits, we can't use that...
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setCameras]
  );

  useEffect(() => {
    if (typeof video === "undefined") {
      return;
    }

    if (currentCameraIndex >= cameras.length) {
      return;
    }

    video.srcObject = cameras[currentCameraIndex].mediaStream;

    video.oncanplaythrough = () => {
      if (typeof video === "undefined") {
        return;
      }

      onPlay(video);
    };

    video.play();
  }, [cameras, currentCameraIndex, onPlay]);

  return { video };
}
