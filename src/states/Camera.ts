import { atom } from "recoil";

export interface Camera {
  mediaDeviceInfo: MediaDeviceInfo;
  mediaStream: MediaStream;
}

export const camerasState = atom<Array<Camera>>({
  key: "cameras",
  default: [],
});

export const currentCameraIndexState = atom<number>({
  key: "currentCameraIndex",
  default: 0,
});

export const flipCameraState = atom<boolean>({
  key: "flipCamera",
  default: true,
});

// If this state is changed, we will take a shot.
export const shotCameraState = atom<number>({
  key: "shotCamera",
  default: 0,
});
