import { atom } from "recoil";

export type CameraType = "Front" | "Back" | "Unknown";

export interface Camera {
  device: MediaDeviceInfo;
  stream: MediaStream;
  type: CameraType;
}

export const camerasState = atom<Array<Camera>>({
  key: "cameras",
  default: [],
});

export const flipCameraState = atom<boolean>({
  key: "flipCamera",
  default: false,
});

export const cameraIndexState = atom<number>({
  key: "cameraIndex",
  default: 0,
});

export const captureCameraState = atom<boolean>({
  key: "captureCamera",
  default: false,
});
