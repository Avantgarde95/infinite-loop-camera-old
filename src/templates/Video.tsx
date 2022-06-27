import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import styled from "@emotion/styled";

import {
  cameraIndexState,
  camerasState,
  captureCameraState,
  flipCameraState,
} from "states/Camera";
import useCanvas from "hooks/useCanvas";
import useVideo from "hooks/useVideo";
import useAnimation from "hooks/useAnimation";
import { getTimeStrings, getTime } from "utils/DateUtils";

type Context = CanvasRenderingContext2D;

function downloadCanvas(context: Context, fileName: string) {
  const link = document.createElement("a");
  link.download = fileName;

  const dataURL = context.canvas.toDataURL("image/png");

  link.href = dataURL.replace(
    /^data:image\/png/,
    "data:application/octet-stream"
  );

  link.click();
}

function clearCanvas(context: Context, width: number, height: number) {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);
}

function drawVideo(
  context: Context,
  width: number,
  height: number,
  video: HTMLVideoElement,
  flip: boolean
) {
  context.save();

  if (flip) {
    context.translate(width, 0);
    context.scale(-1, 1);
  }

  context.drawImage(video, 0, 0);
  context.restore();
}

function drawTexts(context: Context, width: number, height: number) {
  const timeStrings = getTimeStrings(getTime(new Date()));

  const header = "∞ 무한루프 코딩";
  const footer1 = `${timeStrings.year}.${timeStrings.month}.${timeStrings.monthDay} (${timeStrings.weekDay})`;
  const footer2 = `${timeStrings.hour}:${timeStrings.minute} ${timeStrings.ampm}`;
  const fontFamily = '"Gaegu", sans-serif';

  context.fillStyle = "white";

  const defaultFontSize = 16;
  context.font = `${defaultFontSize}px ${fontFamily}`;
  const computedFontSize =
    defaultFontSize * ((width * 0.3) / context.measureText(header).width);

  context.font = `${computedFontSize}px ${fontFamily}`;
  context.fillText(header, width - context.measureText(header).width - 20, 50);
  context.fillText(footer1, 20, height - 80);
  context.fillText(footer2, 20, height - 40);
}

const Video = () => {
  const cameras = useRecoilValue(camerasState);
  //const flipCamera = useRecoilValue(flipCameraState);
  const cameraIndex = useRecoilValue(cameraIndexState);

  const { setCanvasRef, context } = useCanvas();

  const currentCamera =
    cameraIndex < cameras.length ? cameras[cameraIndex] : undefined;

  const { video } = useVideo(currentCamera?.stream, (video) => {
    if (context === null) {
      return;
    }

    const width = 1024;
    const height = video.videoHeight / (video.videoWidth / width);

    video.width = width;
    video.height = height;
    context.canvas.width = Math.min(width, height);
    context.canvas.height = Math.min(width, height);
  });

  const draw = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        if (context === null) {
          return;
        }

        if (video === null) {
          return;
        }

        // We retrieve this states here to prevent them from causing re-rendering.
        const flipCamera = await snapshot.getPromise(flipCameraState);
        const captureCamera = await snapshot.getPromise(captureCameraState);

        const width = context.canvas.width;
        const height = context.canvas.height;

        clearCanvas(context, width, height);
        drawVideo(context, width, height, video, flipCamera);
        drawTexts(context, width, height);

        if (captureCamera) {
          downloadCanvas(context, "Download.png");
          set(captureCameraState, false);
        }
      },
    [context, video]
  );

  useAnimation(() => {
    draw();
  }, 15);

  return (
    <Container>
      <Canvas ref={setCanvasRef} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
  aspect-ratio: 1/1;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

export default Video;
