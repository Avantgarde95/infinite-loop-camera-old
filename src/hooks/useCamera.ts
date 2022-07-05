import { useRecoilCallback } from "recoil";

import { dError, dLog } from "utils/DebugUtils";
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
  const loadCameras = useRecoilCallback(({ snapshot, set }) => async () => {
    dLog("Loading the cameras...");

    // Stop the existing cameras for avoiding OverconstrainedError.
    stopCameras(await snapshot.getPromise(camerasState));
    dLog("- Stopped the existing cameras");

    const devices = await getCameraDevices();
    dLog("- Loaded the devices", ...devices);

    const cameras = await getCameras(devices);
    dLog("- Loaded the streams", ...cameras);

    set(camerasState, cameras);
    dLog("- Done!");
  });

  return {
    loadCameras,
  };
}
