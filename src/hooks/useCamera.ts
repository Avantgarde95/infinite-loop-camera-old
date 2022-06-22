import adapter from "webrtc-adapter";

import { useEffect, useState } from "react";

import { dError, dLog } from "utils/DebugUtils";

type CameraType = "Front" | "Back" | "Unknown";

interface Camera {
  mediaDeviceInfo: MediaDeviceInfo;
  mediaStream: MediaStream;
  type: CameraType;
}

function guessCameraType(mediaDeviceInfo: MediaDeviceInfo): CameraType {
  const label = mediaDeviceInfo.label.toLowerCase();

  if (label.indexOf("front") > 0) {
    return "Front";
  } else if (label.indexOf("back") > 0) {
    return "Back";
  } else {
    return "Unknown";
  }
}

/**
 * Hook for retrieving the devices.
 */
export default function useCamera() {
  const [cameras, setCameras] = useState<Array<Camera>>([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

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

            newCameras.push({
              mediaDeviceInfo,
              mediaStream,
              type: guessCameraType(mediaDeviceInfo),
            });
          } catch (error) {
            dError(error);
          }
        }

        dLog(
          `Retrieved the streams of ${newCameras
            .map((camera) => camera.mediaDeviceInfo.deviceId)
            .join(", ")}`
        );

        if (newCameras.length <= 0) {
          return;
        }

        setCameras(newCameras);
        setCurrentCameraIndex(0);
      })();
    },
    // We don't put `cameras` in the dependency array.
    // Normally we can avoid this hack by using callback state setter.
    // But because of the awaits, we can't use that...
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setCameras]
  );

  return { cameras, currentCameraIndex, setCurrentCameraIndex };
}
