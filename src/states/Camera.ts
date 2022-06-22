import { atom } from "recoil";

interface Camera {
  label: string;
}

export const camerasState = atom<Array<Camera>>({
  key: "cameras",
  default: [],
});

export const currentCameraIndexState = atom<number>({
  key: "currentCameraIndex",
  default: 0,
});
