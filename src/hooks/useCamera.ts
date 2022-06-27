import { useEffect } from "react";
import { useRecoilCallback } from "recoil";

import { dLog, dError } from "utils/DebugUtils";
import { Camera, camerasState, CameraType } from "states/Camera";

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

function stopCameras(cameras: Array<Camera>) {
  for (const camera of cameras) {
    for (const track of camera.stream.getTracks()) {
      track.stop();
    }
  }
}

async function getCameraDevices() {
  return (await navigator.mediaDevices.enumerateDevices()).filter(
    (device) => device.kind === "videoinput"
  );
}

async function getCameras(devices: Array<MediaDeviceInfo>) {
  const cameras: Array<Camera> = [];

  for (const device of devices) {
    // If we get an exception, we just continue.
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: device.deviceId,
        },
      });

      cameras.push({
        device,
        stream,
        type: guessCameraType(device),
      });
    } catch (error) {
      dError(error);
    }
  }

  return cameras;
}

export default function useCamera() {
  // We use useRecoilCallback() for avoiding putting `cameras` in the dependency list.
  const load = useRecoilCallback(({ snapshot, set }) => async () => {
    // Stop the existing cameras for avoiding OverconstrainedError.
    stopCameras(await snapshot.getPromise(camerasState));

    const devices = await getCameraDevices();
    dLog("Loaded the devices", ...devices);

    const cameras = await getCameras(devices);
    dLog("Loaded the streams", ...cameras);

    set(camerasState, cameras);
  });

  useEffect(() => {
    load();
  }, [load]);
}
