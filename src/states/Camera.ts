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
